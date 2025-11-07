import type { LLMProviderProvider } from "../index.js";

/**
 * Google Gemini LLM provider implementation.
 */
export const GeminiProvider: LLMProviderProvider = {
  id: "gemini",
  displayName: "Google Gemini",

  getEnvVariables: ({ apiKey }) => [
    { key: "GOOGLE_API_KEY", value: apiKey },
    { key: "GEMINI_API_KEY", value: apiKey },
  ],
};

