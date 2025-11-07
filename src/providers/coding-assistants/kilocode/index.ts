import * as fs from "fs/promises";
import * as path from "path";
import { spawn } from "child_process";
import type { CodingAssistantProvider, MCPConfigFile } from "../index.js";

/**
 * Kilocode assistant provider implementation.
 * Writes MCP configuration as .mcp.json in project root.
 */
export const KilocodeCodingAssistantProvider: CodingAssistantProvider = {
  id: "kilocode",
  displayName: "Kilocode CLI",
  command: "kilocode",

  async writeMCPConfig({ projectPath, config }) {
    const mcpConfigPath = path.join(projectPath, ".mcp.json");
    await fs.writeFile(mcpConfigPath, JSON.stringify(config, null, 2));
  },

  async launch({ projectPath, prompt }) {
    return new Promise((resolve, reject) => {
      const child = spawn("kilocode", [prompt], {
        cwd: projectPath,
        stdio: "inherit",
        shell: true,
      });

      child.on("error", (error) => {
        reject(new Error(`Failed to launch Kilocode CLI: ${error.message}`));
      });

      child.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Kilocode CLI exited with code ${code}`));
        }
      });
    });
  },
};

