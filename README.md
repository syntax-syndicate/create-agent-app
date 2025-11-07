# Superagents by LangWatch

A CLI for creating production-ready AI agent projects with best practices baked in.

## What is Superagents?

Superagents helps you kickstart agent projects with the right structure, tooling, and best practices from day one. It sets up your project with:

- **Agent Testing Pyramid** methodology
- **LangWatch** integration for prompt management, testing, and evaluation
- **Framework-specific** configurations (Agno, Mastra)
- **Auto-launched coding assistant** (Claude Code, Cursor CLI, or Kilocode CLI) pre-configured as an expert in your chosen framework
- **Production-ready** project structure

## Installation

```bash
npm install -g @langwatch/superagents
```

Or use with npx:

```bash
npx @langwatch/superagents init my-agent-project
```

## Documentation

- **[Quick Start](QUICKSTART.md)** - Get started in 2 minutes
- **[Walkthrough](examples/WALKTHROUGH.md)** - Detailed step-by-step guide
- **[Contributing](CONTRIBUTING.md)** - How to contribute to Superagents
- **[Changelog](CHANGELOG.md)** - Version history

## Usage

### Initialize a new project

```bash
# In current directory
superagents init .

# In a new directory
superagents init my-awesome-agent
```

The CLI will guide you through:

1. **Programming Language**: Python or TypeScript
2. **Agent Framework**: Agno (Python) or Mastra (TypeScript)
3. **Coding Assistant**: Claude Code, Cursor CLI, or Kilocode CLI
4. **LLM Provider**: OpenAI
5. **API Keys**: OpenAI and LangWatch
6. **Project Goal**: What you want to build

### What gets created?

```
my-agent-project/
├── app/ (or src/)           # Main application code
├── prompts/                 # Versioned prompt files
│   └── sample_prompt.yaml
├── tests/
│   ├── evaluations/         # Jupyter notebooks for evaluations
│   │   └── example_eval.ipynb
│   └── scenarios/           # End-to-end scenario tests
│       └── example_scenario.test.{py,ts}
├── prompts.json             # Prompt registry
├── .mcp.json                # MCP server configuration
├── AGENTS.md                # Development guidelines
├── .env                     # Environment variables
└── .gitignore
```

## Philosophy

Superagents promotes the **Agent Testing Pyramid** approach:

1. **Unit Tests** - Test deterministic components
2. **Evals & Optimization** - Measure and optimize probabilistic components
3. **Simulations** - End-to-end validation with Scenario

Learn more: https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid

## Key Features

### 🎯 Framework Integration

- **Agno**: Automatically downloads `.cursorrules` and `llms.txt`
- **Mastra**: Configures Mastra MCP for real-time documentation

### 🧪 LangWatch Integration

- **Prompt CLI**: Manage versioned prompts
- **Scenario Testing**: End-to-end agent testing
- **Evaluations**: Measure component performance
- **MCP Server**: Expert guidance built into your coding assistant

### 🤖 Coding Assistant Setup

Your coding assistant (e.g., Claude Code, Cursor CLI, Kilocode CLI) is:
- **Automatically launched** after project setup with initial prompt
- Pre-configured with framework-specific knowledge (via MCP or docs)
- Loaded with LangWatch best practices
- Equipped with prompt management expertise
- Set up with testing methodologies
- Auto-detected - the CLI shows which assistants are installed on your system

## Requirements

- Node.js 18+
- npm or pnpm
- A coding assistant CLI (one of the following):
  - [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code-agent) (`claude`)
  - [Cursor CLI](https://www.cursor.com/) (`cursor-agent`)
  - [Kilocode CLI](https://www.kilocode.ai/) (`kilocode`)
- API Keys:
  - OpenAI API key
  - LangWatch API key (get one at https://app.langwatch.ai/authorize)

## Development

```bash
# Clone the repo
git clone https://github.com/langwatch/superagents
cd superagents

# Install dependencies
pnpm install

# Run in development
pnpm dev init test-project

# Build
pnpm build
```

## Examples

### Python + Agno

```bash
superagents init trading-agent
# Select: Python, Agno, your preferred coding assistant, OpenAI
# Goal: "Build an agent that can analyze stock prices and provide trading recommendations"
```

### TypeScript + Mastra

```bash
superagents init customer-support
# Select: TypeScript, Mastra, your preferred coding assistant, OpenAI
# Goal: "Build a customer support agent that can handle common queries and escalate complex issues"
```

### Coding Assistant Auto-Launch

After project setup completes, Superagents **automatically launches** your chosen coding assistant with a customized initial prompt that includes:
- Your project goal
- Framework-specific context
- Best practices guidance
- Next steps to get started

The CLI detects which coding assistants are installed on your system and shows installed options first in the selection menu. Not installed assistants appear in gray with "(not installed)" but can still be selected.

## Resources

- [LangWatch](https://langwatch.ai)
- [Scenario Documentation](https://scenario.langwatch.ai/)
- [Agent Testing Pyramid](https://scenario.langwatch.ai/best-practices/the-agent-testing-pyramid)
- [Agno](https://agno.com)
- [Mastra](https://mastra.ai)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Built with ❤️ by the LangWatch team

