import * as fs from "fs/promises";
import * as path from "path";
import type { CodingAssistantProvider, MCPConfigFile } from "../index.js";

/**
 * Claude Code assistant provider implementation.
 * Writes MCP configuration as .mcp.json in project root.
 */
export const ClaudeCodingAssistantProvider: CodingAssistantProvider = {
  id: "claude-code",
  displayName: "Claude Code",

  async writeMCPConfig({ projectPath, config }) {
    const mcpConfigPath = path.join(projectPath, ".mcp.json");
    await fs.writeFile(mcpConfigPath, JSON.stringify(config, null, 2));
  },

  getKickoffInstructions: () =>
    "Open this project in Claude Code and start the conversation.",
};

