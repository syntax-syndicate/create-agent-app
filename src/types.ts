export type ProgrammingLanguage = 'python' | 'typescript';
export type AgentFramework = 'agno' | 'mastra';
export type CodingAssistant = 'claude-code' | 'cursor-cli' | 'kilocode';
export type LLMProvider = 'openai' | 'anthropic' | 'gemini' | 'bedrock' | 'openrouter' | 'grok';

export type ProjectConfig = {
  language: ProgrammingLanguage;
  framework: AgentFramework;
  codingAssistant: CodingAssistant;
  llmProvider: LLMProvider;
  llmApiKey: string;
  llmAdditionalCredentials?: {
    awsSecretKey?: string;
    awsRegion?: string;
  };
  langwatchApiKey: string;
  projectGoal: string;
};

