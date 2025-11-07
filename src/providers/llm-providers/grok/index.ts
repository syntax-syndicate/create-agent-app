import type { LLMProviderProvider } from "../index.js";

/**
 * xAI Grok LLM provider implementation.
 */
export const GrokProvider: LLMProviderProvider = {
  id: "grok",
  displayName: "xAI (Grok)",

  getEnvVariables: ({ apiKey }) => [
    { key: "XAI_API_KEY", value: apiKey },
  ],
};

