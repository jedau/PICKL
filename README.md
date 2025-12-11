# PICKL 🥒

[![CI](https://github.com/jedau/PICKL/actions/workflows/ci.yml/badge.svg)](https://github.com/jedau/PICKL/actions/workflows/ci.yml)
[![CodeQL](https://github.com/jedau/PICKL/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/jedau/PICKL/actions/workflows/codeql-analysis.yml)

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
- **Dark Mode Toggle** - Built-in light/dark theme switcher with localStorage persistence
- **Custom Favicon** - Distinctive pickle emoji 🥒 branding
- **Auto-open Reports** - Reports automatically open in your browser after generation
- **JSON Export** - Raw test results for CI/CD integration

### 🛠️ Developer Experience

- **VS Code Integration** - Tasks for running tests from Command Palette
- **Cucumber Language Support** - Syntax highlighting, go-to-definition, and autocomplete
- **TypeScript + ESM** - Modern JavaScript with full type safety
- **Environment Configuration** - Flexible `.env` file for local customization
- **Unified Test Runner** - Single `npm test` command with CLI flags support

### 🎯 Quality Assurance

- **ESLint + Prettier** - Consistent code formatting and linting
- **Page Object Model** - Maintainable test structure with reusable page objects
- **Custom World** - Shared context across scenarios with automatic browser management
- **Hooks & Formatters** - Extensible test lifecycle with custom formatters

---

## 📚 Documentation

### 🚀 Getting Started

- [Getting Started](docs/GETTING-STARTED.md) - Installation and initial setup guide
- [Running Tests](docs/RUNNING-TESTS.md) - Complete guide to executing tests

### 📖 Learning & Training

- [Learning Path](docs/LEARNING-PATH.md) - Structured 4-week curriculum
- [Training Exercises](docs/TRAINING-EXERCISES.md) - Hands-on practice exercises
- [Common Mistakes](docs/COMMON-MISTAKES.md) - Avoid these 28 common pitfalls

### 📚 Reference

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

### 🔧 Support

- [Troubleshooting](docs/TROUBLESHOOTING.md) - Solutions for common errors

## 🚀 Quick Start

```bash
# Install dependencies
npm install

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

## 📦 Tech Stack

- **Playwright** v1.56.1 - Browser automation
- **Cucumber** v12.2.0 - BDD test framework
- **TypeScript** v5.9.3 - Type-safe JavaScript
- **cucumber-html-reporter** v7.2.0 - HTML report generation
- **tsx** v4.20.6 - TypeScript execution
- **ESLint** + **Prettier** - Code quality tools
