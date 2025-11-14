import * as fs from "fs/promises";
import * as path from "path";
import { ProcessUtils } from "../../../utils/process.util";
import { CliUtils } from "../../../utils/cli.util";
import type { CodingAssistantProvider } from "../index.js";

/**
 * Kilocode assistant provider implementation.
 * Writes MCP configuration as .mcp.json in project root.
 */
export const KilocodeCodingAssistantProvider: CodingAssistantProvider = {
  id: "kilocode",
  displayName: "Kilocode CLI",
  command: "kilocode",

  async isAvailable(): Promise<{
    installed: boolean;
    installCommand?: string;
  }> {
    const installed = await CliUtils.isCommandAvailable("kilocode");
    return {
      installed,
      installCommand: installed ? undefined : "npm install -g @kilocode/cli",
    };
  },

  async writeMCPConfig({ projectPath, config }) {
    const mcpConfigPath = path.join(projectPath, ".mcp.json");
    await fs.writeFile(mcpConfigPath, JSON.stringify(config, null, 2));
  },

  async launch({
    projectPath,
    prompt,
  }: {
    projectPath: string;
    prompt: string;
  }): Promise<void> {
    const chalk = (await import("chalk")).default;

    try {
      console.log(chalk.bold.cyan(`🤖 Launching ${this.displayName}...\n`));
      // Launch kilocode with full terminal control
      // This blocks until kilocode exits
      ProcessUtils.launchWithTerminalControl("kilocode", [prompt], {
        cwd: projectPath,
      });
      console.log(chalk.bold.green("\n✨ Session complete!\n"));
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          chalk.red(
            `\n❌ Failed to launch ${this.displayName}: ${error.message}`
          )
        );
      }
      throw error;
    }
  },
};
