# PICKL 🥒

[![CI](https://github.com/jedau/PICKL/actions/workflows/ci.yml/badge.svg)](https://github.com/jedau/PICKL/actions/workflows/ci.yml)
[![Security](https://img.shields.io/badge/security-scanning-brightgreen)](https://github.com/jedau/PICKL/security)
[![Code Quality](https://img.shields.io/badge/code%20quality-ESLint-blue)](https://eslint.org/)
[![Coverage](https://img.shields.io/badge/coverage-check%20CI-success)](https://github.com/jedau/PICKL/actions/workflows/ci.yml)

**P**laywright **I**ntegrated with **C**ucumber **K**ickoff **L**aunchpad

PICKL is a modern BDD test automation boilerplate that combines Playwright's powerful browser automation with Cucumber's human-readable Gherkin syntax. Built with TypeScript and ESM, it provides everything you need to write, run, and maintain scalable end-to-end tests.

## ✨ Key Features

### 🧪 Test Execution

- **Multi-browser Support** - Run tests on Chromium, Firefox, and WebKit
- **Flexible Tag-Based Filtering** - Organize and run tests using `@smoke`, `@regression`, or custom tags
- **Real-time Progress Display** - Custom verbose formatter with emoji indicators (⏳ → ✅/❌/⊘)
- **Built-in Summary** - Automatic test execution summary with scenario and step counts
- **Headless & Headed Modes** - Debug with visible browsers or run headlessly in CI/CD

### 📊 Reporting

- **HTML Reports** - Beautiful single-page reports with cucumber-html-reporter
- **Automated PR Comments** - Test results automatically posted to pull requests with pass/fail summary
- **Dark Mode Toggle** - Built-in light/dark theme switcher with localStorage persistence
- **Custom Favicon** - Distinctive pickle emoji 🥒 branding
- **Auto-open Reports** - Reports automatically open in your browser after generation
- **JSON Export** - Raw test results for CI/CD integration
- **Artifact Retention** - Test results, screenshots, and videos stored for 30 days

### 🛠️ Developer Experience

- **VS Code Integration** - Tasks for running tests from Command Palette
- **Cucumber Language Support** - Syntax highlighting, go-to-definition, and autocomplete
- **TypeScript + ESM** - Modern JavaScript with full type safety
- **Environment Configuration** - Flexible `.env` file for local customization
- **Unified Test Runner** - Single `npm test` command with CLI flags support
- **Fork-Friendly** - Comprehensive [forking guide](docs/FORKING.md) for customization and CI configuration

### 🎯 Quality Assurance

- **ESLint + Prettier** - Consistent code formatting and linting with strict quality rules
- **Complexity Limits** - Automated checks for cyclomatic complexity, function length, and nesting depth
- **Code Coverage** - c8 coverage tracking with 80% threshold enforcement
- **Security Scanning** - CodeQL and npm audit for vulnerability detection
- **Page Object Model** - Maintainable test structure with reusable page objects
- **Custom World** - Shared context across scenarios with automatic browser management
- **Hooks & Formatters** - Extensible test lifecycle with custom formatters
- **Git Hooks** - Pre-commit quality checks and commit message validation

---

## 📚 Documentation

### 🚀 Getting Started

- [Getting Started](docs/GETTING-STARTED.md) - Installation and initial setup guide
- [Running Tests](docs/RUNNING-TESTS.md) - Complete guide to executing tests

### 📖 Learning & Training

- [Learning Path](docs/LEARNING-PATH.md) - Structured 3-week intensive curriculum
- [Training Exercises](docs/TRAINING-EXERCISES.md) - Hands-on practice exercises
- [Common Mistakes](docs/COMMON-MISTAKES.md) - Avoid these 28 common pitfalls

### 📚 Reference

- [Why BDD?](docs/WHY-BDD.md) - Benefits of BDD and Cucumber for teams
- [Writing Tests](docs/WRITING-TESTS.md) - Gherkin syntax and feature file basics
- [API Reference](docs/API-REFERENCE.md) - Complete API documentation
- [Architecture](docs/ARCHITECTURE.md) - Framework patterns and internals
- [Glossary](docs/GLOSSARY.md) - BDD, Playwright, and testing terminology

### 🤝 Contributing

- [Contributing Guide](docs/CONTRIBUTING.md) - How to contribute to PICKL
- [npm Scripts Reference](docs/CONTRIBUTING.md#available-npm-scripts) - Complete guide to available scripts
- [Branching Strategy](docs/BRANCHING-STRATEGY.md) - Git workflow guidelines
- [Pull Request Guide](docs/PULL-REQUEST.md) - PR best practices
- [Naming Convention](docs/NAMING-CONVENTION.md) - Code naming standards

### 🔒 Security

- [Secrets Management](docs/SECRETS-MANAGEMENT.md) - Handling sensitive data and environment variables
- [Security Policy](SECURITY.md) - Vulnerability reporting and security measures

### 🔧 Support

- [Troubleshooting](docs/TROUBLESHOOTING.md) - Solutions for common errors

## 🚀 Quick Start

```bash
# Fork the repository first on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/PICKL.git
cd PICKL

# Install dependencies
npm install

# Install Playwright browsers (required!)
npx playwright install

# Create your local environment file
cp .env.example .env    # Mac/Linux
copy .env.example .env  # Windows

# Run all tests
npm test

# Run smoke tests
npm test -- --tags @smoke

# Run specific feature
npm test -- test/features/login.feature

# Generate report
npm run report

# Clean up artifacts and caches
npm run clean:all
```

### ⚠️ Windows Users: Line Ending Configuration

If you're on Windows and encounter ESLint errors about CRLF line endings, configure Git to use LF:

```bash
# Configure Git to not convert line endings
git config core.autocrlf false

# Normalize all files in the repository
git add --renormalize .

# Commit the normalized files
git commit -m "chore: normalize line endings to LF"

# Push the changes to your current branch
git push origin HEAD
```

**Why this is needed:**

- PICKL enforces Unix-style line endings (LF) for consistency across platforms
- `.gitattributes` and `.editorconfig` automatically handle this for new files
- Existing clones need the above commands to normalize their files

## 📦 Tech Stack

- **Playwright** v1.58.0 - Browser automation
- **Cucumber** v12.6.0 - BDD test framework
- **TypeScript** v5.9.3 - Type-safe JavaScript
- **cucumber-html-reporter** v7.2.0 - HTML report generation
- **tsx** v4.21.0 - TypeScript execution
- **ESLint** + **Prettier** - Code quality tools
