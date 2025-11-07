import type { LLMProviderProvider } from "../index.js";

/**
 * OpenRouter LLM provider implementation.
 */
export const OpenRouterProvider: LLMProviderProvider = {
  id: "openrouter",
  displayName: "OpenRouter",

  getEnvVariables: ({ apiKey }) => [
    { key: "OPENROUTER_API_KEY", value: apiKey },
  ],
};

