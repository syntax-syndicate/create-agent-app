import type { FrameworkKnowledge } from "../index.js";

/**
 * Returns Mastra framework knowledge for documentation and prompts.
 *
 * @returns Framework knowledge object
 *
 * @example
 * ```ts
 * const knowledge = getKnowledge();
 * console.log(knowledge.setupInstructions);
 * ```
 */
export const getKnowledge = (): FrameworkKnowledge => ({
  setupInstructions: "TypeScript w/pnpm + vitest",
  toolingInstructions:
    "Use the Mastra MCP to learn about Mastra and how to build agents",
  agentsGuideSection: `## Framework-Specific Guidelines

### Mastra Framework

**Always use the Mastra MCP for learning:**

- The Mastra MCP server provides real-time documentation
- Ask it questions about Mastra APIs and best practices
- Follow Mastra's recommended patterns for agent development

**When implementing agent features:**
1. Consult the Mastra MCP: "How do I [do X] in Mastra?"
2. Use Mastra's built-in agent capabilities
3. Follow Mastra's TypeScript patterns and conventions
4. Leverage Mastra's integration ecosystem

**Example questions for Mastra MCP:**
- "How do I create an agent in Mastra?"
- "What's the best way to handle tools in Mastra?"
- "How do I manage agent state in Mastra?"

---
`,
});

