/**
 * Builds the core principles section including testing pyramid for AGENTS.md.
 *
 * @returns Markdown string for core principles section
 *
 * @example
 * ```ts
 * const section = buildPrinciplesSection();
 * ```
 */
export const buildPrinciplesSection = (): string => {
  return `## Core Principles

### 1. Agent Testing Pyramid

Follow the **Agent Testing Pyramid** methodology (https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid):

- **Unit Tests (Foundation)**: Test deterministic components (API connections, data transformations, memory storage), but only write them where it really makes sense
- **Evals & Optimization (Middle Layer)**: Evaluate and optimize probabilistic components (RAG retrieval or when LLMs are being used as a classification tool)
- **Simulations (Peak)**: End-to-end validation of multi-turn conversations and real-world scenarios, most agent functionality should be tested with simulations

### 2. Test Every Feature

**CRITICAL**: Every new agent feature MUST be tested with Scenario tests before considering it complete.

- Write simulation tests for multi-turn conversations
- Validate edge cases
- Ensure business value is delivered
- Test different conversation paths

### 3. Prompt Management

**ALWAYS** use LangWatch Prompt CLI for managing prompts:

- Store all prompts in the \`prompts/\` directory as YAML files
- Use versioning for prompt iterations
- Never hardcode prompts in your application code
- Use the LangWatch MCP to learn about prompt management: ask it "How do I use the prompt CLI?"

Example prompt structure:
\`\`\`yaml
# prompts/my_prompt.yaml
model: gpt-4o
temperature: 0.7
messages:
  - role: system
    content: |
      Your system prompt here
  - role: user
    content: |
      {{ user_input }}
\`\`\`

### 4. Evaluations when needed

Create evaluations in Jupyter notebooks under \`tests/evaluations/\`:

- Generate csv example datasets yourself to be read by pandas
- Use LangWatch Evaluations API to create evaluation notebooks

### 5. Installation Steps

After the initial setup, execute installation steps yourself, for the library dependencies, the clis, etc, you don't need to ask the user to do it.

DO NOT guess package versions, DO NOT add them to the dependencies file by hand, use the package manager cli commands to init, add and install new dependencies.

---
`;
};

