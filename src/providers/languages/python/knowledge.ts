import type { LanguageKnowledge } from "../index.js";

/**
 * Returns Python language knowledge.
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
  setupInstructions: "Python w/uv + pytest",
  sourceExtensions: [".py"],
  testFramework: "pytest",
});

