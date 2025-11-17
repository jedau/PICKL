# Contributing to PICKL 🥒

Thank you for your interest in contributing to PICKL! This guide will help you set up your development environment and understand our contribution process.

## 📋 Table of Contents

- [Setting Up for Development](#setting-up-for-development)
- [Code Contribution Guidelines](#code-contribution-guidelines)
- [Adding New Features](#adding-new-features)
- [Testing Best Practices](#testing-best-practices)
- [Code Quality Standards](#code-quality-standards)

---

## Setting Up for Development

### Prerequisites

1. **Node.js**: v22.21.1 or higher (check `.nvmrc`)
2. **Git**: Latest version
3. **VS Code**: Recommended IDE with extensions (see `.vscode/extensions.json`)

### Initial Setup

For detailed setup instructions, see the [Getting Started Guide](GETTING-STARTED.md). Quick summary:

```bash
# Clone the repository
git clone https://github.com/jedau/PICKL.git
cd PICKL

# Install Node.js version (if using nvm)
nvm install
nvm use

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Verify setup by running tests
npm test

# Generate and view report
npm run report
```

### VS Code Extensions

Install the recommended extensions for the best development experience (see [Getting Started - Extensions](GETTING-STARTED.md#5-finishing-touches)):

- **EditorConfig** - Maintain consistent coding styles
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Playwright Test** - Playwright support
- **TODO Tree** - Highlight TODO/FIXME comments
- **Cucumber** - Gherkin syntax support

---

## Code Contribution Guidelines

### Branching Strategy

Follow our [Branching Strategy](BRANCHING-STRATEGY.md) for branch naming and workflow.

**Branch Naming Format:**

```
<type>/<brief-description>
```

Examples:

- `feature/add-dropdown-page`
- `fix/login-timeout-issue`
- `docs/update-readme`
- `test/add-api-scenarios`

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
git commit -m "feat(login): add remember me checkbox functionality"
git commit -m "fix(hooks): resolve screenshot capture timing issue"
git commit -m "docs(architecture): add custom world pattern explanation"
git commit -m "test(checkboxes): add scenario for disabled checkboxes"
```

### Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following our coding standards
3. **Write/update tests** for your changes
4. **Update documentation** if needed
5. **Run all quality checks**:
   ```bash
   npm run lint          # Check for linting errors
   npm run format        # Format code
   npm test              # Run all tests
   npm run test:smoke    # Run smoke tests
   ```
6. **Create a Pull Request** using our [PR template](.github/pull_request_template.md)
7. **Address review feedback** promptly

---

## Adding New Features

### Adding a New Page Object

1. **Create the page class** in `pages/` directory:

```typescript
// pages/DropdownPage.ts
import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for the Dropdown page
 * URL: https://the-internet.herokuapp.com/dropdown
 */
export class DropdownPage {
  readonly page: Page
  readonly dropdown: Locator

  constructor(page: Page) {
    this.page = page
    this.dropdown = page.locator('#dropdown')
  }

  /**
   * Navigate to the dropdown page
   */
  async goto() {
    await this.page.goto('/dropdown')
  }

  /**
   * Select an option from the dropdown
   * @param value - The value to select
   */
  async selectOption(value: string) {
    await this.dropdown.selectOption(value)
  }

  /**
   * Get the currently selected option
   * @returns The selected option text
   */
  async getSelectedOption(): Promise<string> {
    return (await this.dropdown.inputValue()) ?? ''
  }
}
```

2. **Create a feature file** in `test/features/`:

```gherkin
@smoke
Feature: Dropdown Selection
  As a user
  I want to select options from a dropdown
  So that I can choose from available options

  Background:
    Given I am on the dropdown page

  @positive
  Scenario: Select option 1 from dropdown
    When I select option "1" from the dropdown
    Then the selected option should be "1"
```

3. **Create step definitions** in `test/steps/`:

```typescript
// test/steps/dropdown.steps.ts
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ICustomWorld } from '../support/world.js'
import { DropdownPage } from '../../pages/DropdownPage.js'

Given('I am on the dropdown page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const dropdownPage = new DropdownPage(this.page)
  await dropdownPage.goto()
})

When(
  'I select option {string} from the dropdown',
  async function (this: ICustomWorld, option: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const dropdownPage = new DropdownPage(this.page)
    await dropdownPage.selectOption(option)
  },
)

Then(
  'the selected option should be {string}',
  async function (this: ICustomWorld, expectedOption: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const dropdownPage = new DropdownPage(this.page)
    const selectedOption = await dropdownPage.getSelectedOption()
    expect(selectedOption).toBe(expectedOption)
  },
)
```

4. **Test your changes**:
   ```bash
   npm test -- test/features/dropdown.feature
   ```

### Adding Helper Utilities

Create reusable utilities in `test/utils/`:

```typescript
// test/utils/wait.ts
import { Page } from '@playwright/test'

/**
 * Wait for network to be idle
 */
export async function waitForNetworkIdle(page: Page, timeout = 30000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout })
}

/**
 * Wait for a specific number of milliseconds
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
```

### Adding Custom Step Definition Helpers

To reduce duplication in step definitions, create helper functions:

```typescript
// test/support/step-helpers.ts
import { ICustomWorld } from './world.js'

/**
 * Get the page instance with validation
 */
export function getPage(world: ICustomWorld) {
  if (!world.page) {
    throw new Error('Page is not initialized')
  }
  return world.page
}

/**
 * Usage in step definitions:
 */
import { getPage } from '../support/step-helpers.js'

Given('I am on the dropdown page', async function (this: ICustomWorld) {
  const page = getPage(this)
  const dropdownPage = new DropdownPage(page)
  await dropdownPage.goto()
})
```

---

## Testing Best Practices

### Writing Good Feature Files

**DO:**

- ✅ Use descriptive scenario names
- ✅ Keep scenarios focused on one behavior
- ✅ Use Background for common setup steps
- ✅ Tag scenarios appropriately (@smoke, @regression, @positive, @negative)
- ✅ Write from the user's perspective

**DON'T:**

- ❌ Don't include implementation details in Gherkin
- ❌ Don't write scenarios that are too long (split them up)
- ❌ Don't use technical jargon in feature descriptions
- ❌ Don't duplicate scenarios unnecessarily

### Writing Step Definitions

**Best Practices:**

1. **Keep steps reusable:**

   ```typescript
   // Good - generic and reusable
   When('I enter {string} into the {string} field', async function (value, field) {
     // Implementation
   })

   // Less ideal - too specific
   When('I enter tomsmith into the username field', async function () {
     // Implementation
   })
   ```

2. **Use Page Objects:**

   ```typescript
   // Always use Page Objects in step definitions
   Given('I am on the login page', async function (this: ICustomWorld) {
     const page = getPage(this)
     const loginPage = new LoginPage(page)
     await loginPage.goto()
   })
   ```

3. **Handle errors gracefully:**
   ```typescript
   Then('I should see the success message', async function (this: ICustomWorld) {
     try {
       const page = getPage(this)
       const loginPage = new LoginPage(page)
       const message = await loginPage.getFlashMessage()
       expect(message).toContain('success')
     } catch (error) {
       // Attach screenshot on failure
       if (this.page) {
         const screenshot = await this.page.screenshot()
         this.attach(screenshot, 'image/png')
       }
       throw error
     }
   })
   ```

### Writing Page Objects

**Best Practices:**

1. **Declare locators as readonly properties:**

   ```typescript
   export class LoginPage {
     readonly usernameInput: Locator
     readonly passwordInput: Locator
   }
   ```

2. **Add JSDoc comments:**

   ```typescript
   /**
    * Enter username into the username field
    * @param username - The username to enter
    */
   async enterUsername(username: string) {
     await this.usernameInput.fill(username)
   }
   ```

3. **Create composite methods for common flows:**

   ```typescript
   /**
    * Perform complete login action
    */
   async login(username: string, password: string) {
     await this.enterUsername(username)
     await this.enterPassword(password)
     await this.clickLogin()
   }
   ```

4. **Use descriptive method names:**

   ```typescript
   // Good
   async getFlashMessage(): Promise<string>
   async isOnSecureArea(): Promise<boolean>

   // Less clear
   async getMessage(): Promise<string>
   async check(): Promise<boolean>
   ```

### Test Data Management

**Option 1: Feature File Examples**

```gherkin
Scenario Outline: Login with different credentials
  When I enter username "<username>"
  And I enter password "<password>"
  Then I should see "<result>"

  Examples:
    | username    | password              | result  |
    | tomsmith    | SuperSecretPassword!  | success |
    | invaliduser | wrongpassword         | failure |
```

**Option 2: Test Data Files**

```typescript
// test/fixtures/testData.ts
export const TEST_USERS = {
  validUser: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
  invalidUser: {
    username: 'invaliduser',
    password: 'wrongpassword',
  },
}
```

For hands-on practice with test data, see [Training Exercises - Week 2](TRAINING-EXERCISES.md#week-2-intermediate).

---

## Code Quality Standards

### TypeScript Standards

1. **Use strict typing:**

   ```typescript
   // Good
   async getFlashMessage(): Promise<string>

   // Avoid
   async getFlashMessage(): Promise<any>
   ```

2. **Use async/await consistently:**

   ```typescript
   // Good
   async clickLogin() {
     await this.loginButton.click()
   }

   // Avoid
   clickLogin() {
     return this.loginButton.click()
   }
   ```

3. **Handle null/undefined:**
   ```typescript
   async getFlashMessage(): Promise<string> {
     const text = await this.flashMessage.textContent()
     return text?.replace('×', '').trim() ?? ''
   }
   ```

### Linting and Formatting

Before committing, ensure your code passes all checks:

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint -- --fix

# Format code with Prettier
npm run format
```

### Code Review Checklist

When reviewing code, check for:

- ✅ Follows naming conventions
- ✅ Includes appropriate comments/documentation
- ✅ Has tests covering new functionality
- ✅ No console.log statements (use console.warn or console.error)
- ✅ Proper error handling
- ✅ Uses existing utilities/helpers where applicable
- ✅ TypeScript types are specific (not `any`)
- ✅ Async operations use await
- ✅ Locators are readonly
- ✅ Methods have JSDoc comments

---

## Testing Your Changes

### Before Creating a PR

Run the complete test suite. For comprehensive test execution options, see the [Running Tests Guide](RUNNING-TESTS.md).

```bash
# Run all tests
npm test

# Run specific tags
npm run test:smoke

# Generate report
npm run report
```

### Debugging Tests

For comprehensive debugging techniques, see the [Troubleshooting Guide - Debugging Techniques](TROUBLESHOOTING.md#debugging-techniques).

Quick debugging options:

1. **Run in headed mode:**

   ```bash
   # In .env file
   HEADLESS=false
   ```

2. **Use VS Code debugger:**
   - Set breakpoints in step definitions or page objects
   - Use the Debug task from Command Palette

3. **Use Playwright Inspector:**

   ```bash
   PWDEBUG=1 npm test -- test/features/login.feature
   ```

---

## 📚 Additional Resources

- [Getting Started](GETTING-STARTED.md) - Detailed setup instructions
- [Architecture Documentation](ARCHITECTURE.md) - Understand the framework structure and patterns
- [Training Exercises](TRAINING-EXERCISES.md) - Practice exercises for learning
- [Learning Path](LEARNING-PATH.md) - Structured 4-week training curriculum
- [API Reference](API-REFERENCE.md) - Detailed API documentation
- [Writing Tests Guide](WRITING-TESTS.md) - How to write feature files and steps
- [Running Tests Guide](RUNNING-TESTS.md) - How to execute tests
- [Common Mistakes](COMMON-MISTAKES.md) - Avoid these 28 common pitfalls
- [Troubleshooting](TROUBLESHOOTING.md) - Solutions for common issues

---

## Getting Help

- Create an issue for bugs or feature requests
- Ask questions in pull request comments
- Review existing documentation and examples
- Check the [Troubleshooting Guide](TROUBLESHOOTING.md) for common issues

---

**Thank you for contributing to PICKL! 🥒**
