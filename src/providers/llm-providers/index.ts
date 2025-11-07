import { OpenAIProvider } from "./openai/index.js";

export type EnvVariable = {
  key: string;
  value: string;
};

/**
 * Interface for LLM provider configuration.
 * Each provider returns environment variables needed for API access.
 *
 * @example
 * ```ts
 * const provider = getLLMProvider({ provider: 'openai' });
 * const envVars = provider.getEnvVariables({ apiKey: 'sk-...' });
 * ```
 */
export interface LLMProviderProvider {
  readonly id: string;
  readonly displayName: string;

  /** Returns environment variables needed for this provider */
  getEnvVariables(params: { apiKey: string }): EnvVariable[];

  /** Validates API key format/connectivity */
  validateApiKey?(params: { apiKey: string }): Promise<boolean>;
}

const PROVIDERS: Record<string, LLMProviderProvider> = {
  openai: OpenAIProvider,
};

/**
 * Gets an LLM provider by ID.
 *
 * @param params - Parameters object
 * @param params.provider - LLM provider identifier
 * @returns LLM provider instance
 *
 * @example
 * ```ts
 * const provider = getLLMProvider({ provider: 'openai' });
 * ```
 */
export const getLLMProvider = ({
  provider,
}: {
  provider: string;
}): LLMProviderProvider => {
  const llmProvider = PROVIDERS[provider];
  if (!llmProvider) {
    throw new Error(`LLM provider not found: ${provider}`);
  }
  return llmProvider;
};

/**
 * Gets all available LLM providers.
 *
 * @returns Array of LLM providers
 *
 * @example
 * ```ts
 * const providers = getAllLLMProviders();
 * ```
 */
export const getAllLLMProviders = (): LLMProviderProvider[] => {
  return Object.values(PROVIDERS);
};

