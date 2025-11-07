import chalk from 'chalk';
import type { ProjectConfig } from '../types.js';
import { buildInitialPrompt } from './build-initial-prompt.js';
import { getCodingAssistantProvider } from '../providers/coding-assistants/index.js';

/**
 * Kicks off the coding assistant with initial instructions.
 *
 * @param params - Parameters object
 * @param params.projectPath - Absolute path to project root
 * @param params.config - Project configuration
 * @returns Promise that resolves when assistant is launched
 *
 * @example
 * ```ts
 * await kickoffAssistant({ projectPath: '/path/to/project', config });
 * ```
 */
export const kickoffAssistant = async ({
  projectPath,
  config
}: {
  projectPath: string;
  config: ProjectConfig;
}): Promise<void> => {
  const prompt = buildInitialPrompt({ config });
  const provider = getCodingAssistantProvider({ assistant: config.codingAssistant });

  console.log(chalk.bold.cyan('\n🤖 Launching your coding assistant...\n'));
  console.log(chalk.gray('Initial prompt:'));
  console.log(chalk.white(`"${prompt}"\n`));
  console.log(chalk.yellow(`Starting ${provider.displayName}...\n`));

  try {
    await provider.launch({ projectPath, prompt });
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red(`\n❌ Failed to launch ${provider.displayName}: ${error.message}`));
      console.log(chalk.yellow('\nYou can manually start the assistant by running:'));
      console.log(chalk.cyan(`  cd ${projectPath}`));
      console.log(chalk.cyan(`  ${provider.command} "${prompt}"`));
    }
    throw error;
  }
};

