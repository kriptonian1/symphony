# Contributing to Symphony

First off, thank you for considering contributing to Symphony! 🎉 It's people like you that make Symphony such a great tool for E2E testing.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## Local Development Setup

### Prerequisites

Before you begin, make sure you have **[Bun](https://bun.sh/)** installed. Bun is a **required** prerequisite for this project.

### Setup Steps

Follow these steps to set up Symphony locally:

#### 1. Fork the **Repository**

Go to [https://github.com/kriptonian1/symphony](https://github.com/kriptonian1/symphony) and click the "Fork" button in the top right to create your own copy of the repository.

#### 2. Clone Your Fork

```bash
# Clone your forked repository (replace YOUR_USERNAME with your GitHub username)
git clone https://github.com/YOUR_USERNAME/symphony.git
cd symphony
```

#### 3. Install Dependencies

```bash
# Install all project dependencies using Bun
bun install
```

#### 4. Install Playwright Browsers

Symphony uses Playwright for browser automation. Install the required browsers for Chrome, Firefox, and WebKit:

```bash
# Install Chromium, Firefox, and WebKit browsers
npx playwright@1.56.0 install chromium firefox webkit
```

#### 5. Verify Your Setup

To check if everything is working correctly, run a test workflow:

```bash
# Run the Tailwind example workflow
bun start -f ./flow-example/tailwind.yml
```

If the browser opens and runs the test successfully, congratulations! 🎉 Your local setup is complete and you're ready to contribute.

### Quick Setup Summary

```bash
# Quick setup commands
git clone https://github.com/YOUR_USERNAME/symphony.git
cd symphony
bun install
npx playwright@1.56.0 install chromium firefox webkit
bun start -f flow-example/tailwind.yml
```

## Code Style and Quality

Symphony uses **Biome** for code formatting and linting.

### Format and Lint Your Code

```bash
# Auto-fix formatting and linting issues
bun run format-lint

# Check without fixing
bun run format-lint:check
```

### Code Style Rules

- **Indentation**: Tabs (not spaces)
- **Quotes**: Double quotes for strings
- **File naming**: kebab-case (e.g., `my-flow.ts`)

## Commit Guidelines

Symphony uses [Conventional Commits](https://www.conventionalcommits.org/) for standardized commit messages.

### Commit Message Format

```
<type>(<scope>): <subject>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
git commit -m "feat(flows): add hover flow support"
git commit -m "fix(browser): resolve Chrome headless detection issue"
git commit -m "docs: update CONTRIBUTING.md with setup steps"
```

## Reporting Bugs

Found a bug? [Create an issue](https://github.com/kriptonian1/symphony/issues/new) with:

- **Title**: Short, descriptive summary
- **Description**: What happened vs what should happen
- **Steps to reproduce**
- **YAML workflow** that reproduces the issue
- **Error messages/logs**
- **Environment**:
  - Symphony version: `symphony --version`
  - Bun version: `bun --version`
  - OS: macOS / Linux / Windows
  - Browser engine: chromium / webkit / Firefox

## Questions

Have questions? Here's how to get help:

1. Check the [Developer Docs](docs/developer-docs.md)
2. Search [existing issues](https://github.com/kriptonian1/symphony/issues)
3. Create a new issue for your question

---

Thank you for contributing to Symphony!
