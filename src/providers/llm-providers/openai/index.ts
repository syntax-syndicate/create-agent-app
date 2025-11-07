import type { LLMProviderProvider } from "../index.js";

/**
 * OpenAI LLM provider implementation.
 */
export const OpenAIProvider: LLMProviderProvider = {
  id: "openai",
  displayName: "OpenAI",

  getEnvVariables: ({ apiKey }) => [{ key: "OPENAI_API_KEY", value: apiKey }],
};

