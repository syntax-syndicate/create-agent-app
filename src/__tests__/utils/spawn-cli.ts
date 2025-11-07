import { spawn } from "child_process";
import * as path from "path";

/**
 * Spawns the CLI process for testing.
 *
 * @param params - Command parameters
 * @returns Promise resolving to CLI execution result
 *
 * @example
 * ```ts
 * const result = await spawnCLI({
 *   args: ['init', 'test-project'],
 *   inputs: ['typescript\n', 'agno\n'],
 *   cwd: '/tmp/test'
 * });
 * ```
 */
export const spawnCLI = async (params: {
  args: string[];
  inputs: string[];
  cwd: string;
}): Promise<{
  stdout: string;
  stderr: string;
  exitCode: number;
}> => {
  const { args, inputs, cwd } = params;

  return new Promise((resolve, reject) => {
    // Path to the built CLI entry point
    const cliPath = path.join(process.cwd(), "dist", "index.js");

    const child = spawn("node", [cliPath, ...args], {
      cwd,
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        ...process.env,
        // Force non-interactive mode if needed
        CI: "true",
      },
    });

    let stdout = "";
    let stderr = "";
    let inputIndex = 0;

    child.stdout?.on("data", (data) => {
      const text = data.toString();
      stdout += text;

      // Send next input when we detect a prompt
      // This is a simple heuristic - adjust based on actual prompt detection
      if (
        inputIndex < inputs.length &&
        (text.includes("?") || text.includes(">"))
      ) {
        setTimeout(() => {
          child.stdin?.write(inputs[inputIndex]);
          inputIndex++;
        }, 100);
      }
    });

    child.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      resolve({
        stdout,
        stderr,
        exitCode: code ?? 0,
      });
    });

    child.on("error", (error) => {
      reject(error);
    });

    // Send first input after a short delay to let CLI initialize
    setTimeout(() => {
      if (inputs.length > 0 && inputIndex === 0) {
        child.stdin?.write(inputs[inputIndex]);
        inputIndex++;
      }
    }, 200);
  });
};
