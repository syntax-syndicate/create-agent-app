import * as fs from "fs/promises";
import * as path from "path";
import { ProcessUtils } from "../../../utils/process.util";
import { CliUtils } from "../../../utils/cli.util";
import type { CodingAssistantProvider } from "../index.js";

/**
 * Claude Code assistant provider implementation.
 * Writes MCP configuration as .mcp.json in project root.
 */
export const ClaudeCodingAssistantProvider: CodingAssistantProvider = {
  id: "claude-code",
  displayName: "Claude Code",
  command: "claude",

  async isAvailable(): Promise<{
    installed: boolean;
    installCommand?: string;
  }> {
    const installed = await CliUtils.isCommandAvailable("claude");
    return {
      installed,
      installCommand: installed
        ? undefined
        : "npm install -g @anthropic-ai/claude-code",
    };
  },

  async writeMCPConfig({ projectPath, config }) {
    const mcpConfigPath = path.join(projectPath, ".mcp.json");
    await fs.writeFile(mcpConfigPath, JSON.stringify(config, null, 2));

    // Create CLAUDE.md that references AGENTS.md
    const claudeMdPath = path.join(projectPath, "CLAUDE.md");
    const claudeMdContent = `@AGENTS.md\n`;
    await fs.writeFile(claudeMdPath, claudeMdContent);
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
      // Launch claude with full terminal control
      // This blocks until claude exits
      ProcessUtils.launchWithTerminalControl("claude", [prompt], {
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
