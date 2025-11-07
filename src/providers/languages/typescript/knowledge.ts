import type { LanguageKnowledge } from "../index.js";

/**
 * Returns TypeScript language knowledge.
 *
 * @returns Language knowledge object
 *
 * @example
 * ```ts
 * const knowledge = getKnowledge();
 * console.log(knowledge.testFramework);
 * ```
 */
export const getKnowledge = (): LanguageKnowledge => ({
  setupInstructions: "TypeScript w/pnpm + vitest",
  sourceExtensions: [".ts", ".tsx"],
  testFramework: "vitest",
});

