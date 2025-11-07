import { ClaudeCodingAssistantProvider } from "./claude/index.js";

export type MCPConfigFile = {
  mcpServers: Record<
    string,
    {
      command: string;
      args?: string[];
      type?: string;
    }
  >;
};

/**
 * Interface for coding assistant providers.
 * Each assistant implements MCP config writing and kickoff instructions.
 *
 * @example
 * ```ts
 * const provider = getCodingAssistantProvider({ assistant: 'claude-code' });
 * await provider.writeMCPConfig({ projectPath, config });
 * ```
 */
export interface CodingAssistantProvider {
  readonly id: string;
  readonly displayName: string;

  /** Writes MCP config in assistant-specific format/location */
  writeMCPConfig(params: {
    projectPath: string;
    config: MCPConfigFile;
  }): Promise<void>;

  /** Returns instructions for starting assistant */
  getKickoffInstructions(): string;
}

const PROVIDERS: Record<string, CodingAssistantProvider> = {
  "claude-code": ClaudeCodingAssistantProvider,
};

/**
 * Gets a coding assistant provider by ID.
 *
 * @param params - Parameters object
 * @param params.assistant - Coding assistant identifier
 * @returns Coding assistant provider instance
 *
 * @example
 * ```ts
 * const provider = getCodingAssistantProvider({ assistant: 'claude-code' });
 * ```
 */
export const getCodingAssistantProvider = ({
  assistant,
}: {
  assistant: string;
}): CodingAssistantProvider => {
  const provider = PROVIDERS[assistant];
  if (!provider) {
    throw new Error(`Coding assistant provider not found: ${assistant}`);
  }
  return provider;
};

/**
 * Gets all available coding assistant providers.
 *
 * @returns Array of coding assistant providers
 *
 * @example
 * ```ts
 * const assistants = getAllCodingAssistants();
 * ```
 */
export const getAllCodingAssistants = (): CodingAssistantProvider[] => {
  return Object.values(PROVIDERS);
};
