import { select, input, password } from "@inquirer/prompts";
import chalk from "chalk";
import type {
  ProjectConfig,
  AgentFramework,
  CodingAssistant,
  LLMProvider,
} from "../types.js";
import { buildLanguageChoices } from "./choice-builders/language-choices.js";
import { buildFrameworkChoices } from "./choice-builders/framework-choices.js";
import { validateOpenAIKey } from "./validators/openai-key.js";
import { validateLangWatchKey } from "./validators/langwatch-key.js";
import { validateProjectGoal } from "./validators/project-goal.js";

/**
 * Collects project configuration from user via interactive CLI prompts.
 *
 * @returns Promise resolving to complete ProjectConfig
 *
 * @example
 * ```ts
 * const config = await collectConfig();
 * // Returns: { language: 'python', framework: 'agno', ... }
 * ```
 */
export const collectConfig = async (): Promise<ProjectConfig> => {
  try {
    console.log(chalk.bold.cyan("\n🚀 Welcome to Superagents by LangWatch!\n"));
    console.log(
      chalk.gray("Let's set up your production-ready agent project.\n")
    );

    const language = await select({
      message: "What programming language do you want to use?",
      choices: buildLanguageChoices(),
    });

    const framework = await select<AgentFramework>({
      message: "What agent framework do you want to use?",
      choices: buildFrameworkChoices({ language }),
    });

    const codingAssistant = await select<CodingAssistant>({
      message: "What coding assistant do you want to use?",
      choices: [{ name: "Claude Code", value: "claude-code" }],
    });

    const llmProvider = await select<LLMProvider>({
      message: "What LLM provider do you want to use?",
      choices: [{ name: "OpenAI", value: "openai" }],
    });

    const openaiApiKey = await password({
      message: "Enter your OpenAI API key:",
      mask: "*",
      validate: validateOpenAIKey,
    });

    console.log(chalk.gray("\nTo get your LangWatch API key, visit:"));
    console.log(chalk.blue.underline("https://app.langwatch.ai/authorize\n"));

    const langwatchApiKey = await password({
      message: "Enter your LangWatch API key:",
      mask: "*",
      validate: validateLangWatchKey,
    });

    const projectGoal = await input({
      message: "What do you want to build?",
      validate: validateProjectGoal,
    });

    return {
      language,
      framework,
      codingAssistant,
      llmProvider,
      openaiApiKey,
      langwatchApiKey,
      projectGoal,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes("User force closed")) {
      console.log(chalk.yellow("\n\nSetup cancelled by user"));
      process.exit(0);
    }
    throw error;
  }
};
