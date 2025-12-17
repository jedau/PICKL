# Contributing to PICKL 🥒

Thank you for your interest in contributing to PICKL! This guide will help you set up your development environment and understand our contribution process.

## 📋 Table of Contents

- [Getting Started with Contributions](#getting-started-with-contributions)
- [Setting Up for Development](#setting-up-for-development)
- [Available npm Scripts](#available-npm-scripts)
- [Code Contribution Guidelines](#code-contribution-guidelines)
- [Adding New Features](#adding-new-features)
- [Testing Best Practices](#testing-best-practices)
- [Code Quality Standards](#code-quality-standards)

---

## Getting Started with Contributions

### For External Contributors: Fork Workflow

If you don't have write access to the repository, follow the fork workflow:

#### 1. Fork the Repository

1. Go to https://github.com/jedau/PICKL
2. Click the **Fork** button (top right)
3. This creates a copy under your account: `https://github.com/YOUR-USERNAME/PICKL`

#### 2. Clone Your Fork

```bash
# Clone your forked repository
git clone https://github.com/YOUR-USERNAME/PICKL.git
cd PICKL

# Add the original repository as "upstream"
git remote add upstream https://github.com/jedau/PICKL.git

# Verify remotes
git remote -v
# Should show:
# origin    https://github.com/YOUR-USERNAME/PICKL.git (fetch)
# origin    https://github.com/YOUR-USERNAME/PICKL.git (push)
# upstream  https://github.com/jedau/PICKL.git (fetch)
# upstream  https://github.com/jedau/PICKL.git (push)
```

#### 3. Keep Your Fork Updated

Before starting new work, sync with the original repository:

```bash
# Fetch latest changes from upstream
git fetch upstream

# Switch to your main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push updates to your fork
git push origin main
```

#### 4. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Make your changes, then commit
git add .
git commit -m "feat: description of your changes"
```

#### 5. Push to Your Fork

```bash
# Push your feature branch to YOUR fork (origin)
git push origin feature/your-feature-name

# If it's your first push for this branch, Git might ask you to set upstream:
git push --set-upstream origin feature/your-feature-name
```

#### 6. Create a Pull Request

1. Go to your fork on GitHub: `https://github.com/YOUR-USERNAME/PICKL`
2. Click **"Compare & pull request"** (GitHub will show this banner after pushing)
3. Or go to: https://github.com/jedau/PICKL/compare
   - Select: `base: main` ← `compare: YOUR-USERNAME:feature/your-feature-name`
4. Fill in the PR template
5. Click **"Create pull request"**
6. Wait for code owner review

#### 7. Update Your PR (if requested)

If changes are requested during review:

```bash
# Make the requested changes
git add .
git commit -m "fix: address review feedback"

# Push to the same branch
git push origin feature/your-feature-name

# The PR will automatically update!
```

### For Repository Collaborators: Direct Branch Workflow

If you have write access to the repository:

```bash
# Clone the main repository
git clone https://github.com/jedau/PICKL.git
cd PICKL

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push directly to the main repository
git push origin feature/your-feature-name

# Create PR on GitHub
```

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

**Git Hooks Setup:**

Git hooks are automatically installed when you run `npm install` (via the `prepare` script). These hooks will:

- Prevent direct commits to the `main` branch
- Run linting and formatting on staged files before commits
- Validate commit message format

To verify hooks are installed:

```bash
ls -la .husky/
# Should see: pre-commit, commit-msg
```

### VS Code Workspace Configuration

PICKL includes comprehensive VS Code workspace settings to enhance your development experience. The workspace is pre-configured with:

#### Workspace Settings (`.vscode/settings.json`)

The project includes optimized settings for:

- **Auto-formatting** on save with Prettier
- **ESLint** auto-fix on save
- **Import organization** automatically
- **Consistent editor behavior** (tabs, line endings, rulers)
- **Optimized search** excluding `node_modules` and test artifacts
- **Cucumber integration** for Gherkin files

#### Debug Configurations (`.vscode/launch.json`)

Five debugging configurations are available via the Debug panel (Ctrl+Shift+D / Cmd+Shift+D):

1. **Debug Current Feature File** - Debug the currently open `.feature` file
   - Opens browser in headed mode (HEADLESS=false)
   - Stops at breakpoints in step definitions
   - **Usage:** Open a `.feature` file and press **F5** (or click the green play button in Run and Debug panel)
   - **Example:** Open `test/features/login.feature`, set breakpoint in `test/steps/login.steps.ts`, press F5 or use Run and Debug

2. **Debug All Tests** - Debug all test suites
   - Runs entire test suite with debugger attached
   - Useful for investigating issues across multiple features
   - **Usage:** Select "Debug All Tests" from debug dropdown, press **F5** (or click the green play button)

3. **Debug Specific Scenario (by line)** - Debug a single scenario
   - Opens the feature file
   - Place cursor on any line within the scenario you want to debug
   - Press **F5** (or click the green play button) to debug only that scenario
   - **Usage:** Open `.feature` file → Click on scenario line → Press **F5** or use Run and Debug

4. **Debug with Tag** - Debug tests matching a specific tag
   - Prompts you to select a tag: `@smoke`, `@positive`, `@negative`, `@regression`, `@fail`, `@skip`
   - Runs all tests matching the selected tag
   - **Usage:** Select "Debug with Tag" from dropdown → Press **F5** (or click green play button) → Select tag from prompt
   - You can also type custom tag expressions like `@smoke and @positive` or `not @skip`

5. **Attach to Node Process** - Attach to running Node process
   - For advanced debugging scenarios
   - Use when manually starting tests with `--inspect` or `--inspect-brk` flag

#### Debugging Tips

**Setting Breakpoints:**

- Click the left gutter (line numbers area) in step definition files to set breakpoints
- Breakpoints work reliably in **step definition files** (`test/steps/**/*.ts`)
- Breakpoints in **page object files** (`pages/**/*.ts`) may not work due to TypeScript transpilation

**Debugging Keyboard Shortcuts:**

- **F5** - Start debugging / Continue execution
- **F10** - Step Over (execute current line, move to next)
- **F11** - Step Into (go inside function calls)
- **Shift+F11** - Step Out (exit current function)
- **Ctrl+Shift+F5** - Restart debugging
- **Shift+F5** - Stop debugging

**Debugging Page Objects:**
Since breakpoints in page objects don't always work reliably, use **F11 (Step Into)** from a step breakpoint:

```typescript
// test/steps/login.steps.ts
When('I enter username {string}', async function (username: string) {
  const loginPage = new LoginPage(this.page)
  await loginPage.enterUsername(username) // <-- Set breakpoint here, press F11 to step into
})
```

Press **F11** on the `enterUsername()` call to step into the page object method.

**Auto Attach Setting:**
For the best debugging experience, set VS Code's Auto Attach to **"Only With Flag"**:

1. Press **Ctrl+Shift+P** (Cmd+Shift+P on Mac)
2. Type: `"Debug: Toggle Auto Attach"`
3. Select **"Only With Flag"**

This ensures the debugger only attaches when using F5 or the Run and Debug panel, not during normal test runs.

#### Debugging FAQ

**Q: Why does "Waiting for the debugger to disconnect..." appear 3 times?**

A: This is normal! When debugging through npm scripts, VS Code attaches to each process in the chain:

- npm process
- tsx (TypeScript runtime) process
- cucumber.js process

Each shows the message when finishing. This is cosmetic and doesn't affect functionality.

**Q: Why don't breakpoints work in my page object files?**

A: TypeScript transpilation with tsx makes source maps unreliable for page objects. Use **F11 (Step Into)** from a step definition breakpoint to debug into page objects, or add temporary `console.log()` statements.

**Q: Can I debug tests in headless mode?**

A: By default, debug configurations run with `HEADLESS=false` so you can see the browser. To debug in headless mode, edit `.vscode/launch.json` and change `"HEADLESS": "false"` to `"HEADLESS": "true"` for the configuration you're using.

**Q: How do I debug a test that's failing in CI but passing locally?**

A: Use the "Debug with Tag" configuration and select the tag used in CI (e.g., `@regression` or `@smoke`). You can also set `HEADLESS=true` in launch.json to match CI conditions more closely.

**Q: The debugger isn't stopping at my breakpoints.**

A: Ensure:

1. You set breakpoints in **step definition files** (`test/steps/**/*.ts`), not page objects
2. The feature file you're debugging actually executes that step
3. Auto Attach is set to "Only With Flag"
4. You're using F5 or the Run and Debug panel (not running `npm test` in terminal)

#### Tasks (`.vscode/tasks.json`)

Quick access to common commands via Terminal > Run Task (Ctrl+Shift+P → "Tasks: Run Task"):

- **Run Current Feature File** - Test the currently open feature file (Ctrl+Shift+B)
- **Run All Tests** - Execute complete test suite
- **Run Smoke Tests** - Execute only `@smoke` tagged tests
- **Generate Report** - Create HTML test report
- **Lint** - Run ESLint checks
- **Format** - Format all code with Prettier
- **Clean Test Results** - Remove test artifacts
- **Install Dependencies** - Run npm install
- **Verify Hooks** - Check git hooks status

**Quick Tip:** Press `Ctrl+Shift+B` (Cmd+Shift+B on Mac) to run the default task (Run Current Feature File).

#### Recommended Extensions (`.vscode/extensions.json`)

VS Code will prompt to install these recommended extensions:

- **EditorConfig** - Maintain consistent coding styles
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Playwright Test** - Playwright support
- **TODO Tree** - Highlight TODO/FIXME comments
- **Cucumber** - Gherkin syntax support

**To install all at once:** Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P) → "Extensions: Show Recommended Extensions" → Click "Install Workspace Extension Recommendations"

---

### VS Code Extensions

Install the recommended extensions for the best development experience (see [Getting Started - Extensions](GETTING-STARTED.md#5-finishing-touches)):

- **EditorConfig** - Maintain consistent coding styles
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Playwright Test** - Playwright support
- **TODO Tree** - Highlight TODO/FIXME comments
- **Cucumber** - Gherkin syntax support

---

## Available npm Scripts

This framework provides several npm scripts to streamline development and testing workflows. Below is a comprehensive reference organized by purpose.

### 🧹 Cleanup Scripts

#### `npm run clean`

Remove only the test results directory.

```bash
npm run clean
```

**When to use:**

- Quick cleanup between test runs
- CI/CD pipeline cleanup step
- Free up space when test results accumulate

#### `npm run clean:all`

Comprehensive cleanup of all test artifacts and caches.

```bash
npm run clean:all
```

**What it removes:**

- `test-results/` - Test execution results
- `node_modules/.cache/` - Build caches
- `playwright-report/` - HTML test reports
- `.playwright/` - Playwright browser cache
- `coverage/` - Code coverage reports
- `.nyc_output/` - Coverage instrumentation data
- `downloads/` - Downloaded test files

**When to use:**

- Disk space running low
- Clean slate before major test runs
- Troubleshooting build/cache issues
- Before creating a release

**Debug output:**

```bash
# See detailed cleanup logs
DEBUG=framework:cleanup npm run clean:all
```

### 🧪 Testing Scripts

#### `npm test`

Run all tests with default configuration (Chromium browser).

```bash
npm test
```

**Output:** Generates test results in `test-results/` directory.

#### `npm run test:chromium`

Run tests specifically in Chromium browser.

```bash
npm run test:chromium
```

**Use case:** Verify Chromium-specific behavior or troubleshoot browser-specific issues.

#### `npm run test:firefox`

Run tests specifically in Firefox browser.

```bash
npm run test:firefox
```

**Use case:** Cross-browser testing, Firefox-specific scenarios.

#### `npm run test:webkit`

Run tests specifically in WebKit browser (Safari engine).

```bash
npm run test:webkit
```

**Use case:** Safari compatibility testing, iOS simulation.

#### `npm run test:smoke`

Run only smoke tests (scenarios tagged with `@smoke`).

```bash
npm run test:smoke
```

**When to use:**

- Quick validation after code changes
- Pre-commit checks
- CI/CD gate before full test suite
- Rapid feedback during development

**Example scenario tags:**

```gherkin
@smoke
Scenario: Login with valid credentials
  Given I am on the login page
  When I enter valid credentials
  Then I should be logged in successfully
```

#### `npm run test:regression`

Run only regression tests (scenarios tagged with `@regression`).

```bash
npm run test:regression
```

**When to use:**

- Full regression suite before releases
- Scheduled nightly test runs
- Post-deployment validation
- Comprehensive feature coverage testing

#### `npm run test:clean`

Clean test results, then run all tests.

```bash
npm run test:clean
```

**Equivalent to:**

```bash
npm run clean && npm test
```

**When to use:**

- Ensure fresh test run without old artifacts
- Automated CI/CD test execution
- Debugging test result issues

### 📊 Reporting Scripts

#### `npm run report`

Generate and open HTML test report.

```bash
npm run report
```

**What it does:**

1. Processes test results from `test-results/` directory
2. Generates HTML report in `playwright-report/` directory
3. Automatically opens report in default browser

**When to use:**

- After test execution to view results
- Analyze test failures with screenshots and traces
- Share test results with team members
- Review historical test trends

**Report includes:**

- Test execution summary
- Pass/fail statistics
- Screenshots of failures
- Execution traces
- Error stack traces
- Test duration metrics

### 🔧 Code Quality Scripts

#### `npm run lint`

Run ESLint to check for code quality issues.

```bash
npm run lint
```

**Checks for:**

- TypeScript syntax errors
- Code style violations
- Unused variables/imports
- Type safety issues
- Best practice violations
- Line ending consistency (enforces LF)

**Auto-fix issues:**

```bash
npm run lint -- --fix
```

**When to use:**

- Before committing code
- During code review
- In pre-commit hooks
- CI/CD quality gates

#### `npm run format`

Format code with Prettier.

```bash
npm run format
```

**What it formats:**

- JavaScript/TypeScript files (`.js`, `.ts`)
- JSON configuration files
- Markdown documentation files
- Line endings (converts to LF)

**When to use:**

- Before committing code
- After bulk code changes
- Ensuring consistent code style across team
- Pre-commit hooks

---

### 🔗 Common Script Combinations

#### Pre-commit workflow

```bash
npm run lint           # Check for linting errors
npm run format         # Format all code
npm run test:smoke     # Run quick smoke tests
```

#### Full quality check before PR

```bash
npm run clean:all      # Clean all artifacts
npm run lint           # Check code quality
npm run format         # Format code
npm test               # Run full test suite
npm run report         # View test results
```

#### Cross-browser testing workflow

```bash
npm run clean
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run report
```

#### CI/CD pipeline workflow

```bash
npm run clean:all      # Clean environment
npm run lint           # Code quality gate
npm run test:smoke     # Quick validation
npm test               # Full test suite
npm run report         # Generate results
```

---

### 💡 Tips and Tricks

**1. Run specific feature files:**

```bash
npm test -- test/features/login.feature
```

**2. Run with custom tags:**

```bash
TAGS=@positive npm test
```

**3. Combine multiple tags:**

```bash
TAGS="@smoke and @positive" npm test
```

**4. Run in headed mode (see browser):**

```bash
HEADLESS=false npm test
```

**5. Debug tests with Playwright Inspector:**

```bash
PWDEBUG=1 npm test -- test/features/login.feature
```

**6. Run with debug logging:**

```bash
DEBUG=framework:*,test:* npm test
```

**7. Chain cleanup with specific browser:**

```bash
npm run clean && BROWSER=firefox npm test
```

---

For more detailed information about test execution options, see the [Running Tests Guide](RUNNING-TESTS.md).

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

### Branch Protection

The `main` branch is protected with the following rules:

- ❌ **No direct pushes allowed** - All changes must go through Pull Requests
- ❌ **No force pushes allowed** - Protects commit history integrity
- ❌ **No branch deletion allowed** - Prevents accidental deletion
- ✅ **Pull Requests require at least 1 approval** - Code review is mandatory
- ✅ **All CI checks must pass** - Automated tests must succeed
- ✅ **Branch must be up to date** - Must merge latest changes before merging PR

**What this means for you:**

- You cannot push directly to `main` with `git push origin main`
- You cannot force push with `git push --force`
- All contributions must follow the Pull Request workflow below

### Pull Request Process

1. **Create a feature branch** from `main`
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** following our coding standards
3. **Write/update tests** for your changes
4. **Update documentation** if needed
5. **Run all quality checks**:
   ```bash
   npm run lint          # Check for linting errors
   npm run format        # Format code
   npm test              # Run all tests
   npm run test:smoke    # Run smoke tests
   npm run clean:all     # Clean up artifacts (optional)
   ```
6. **Commit and push your branch**:
   ```bash
   git add .
   git commit -m "feat(scope): description of changes"
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request** on GitHub using our [PR template](.github/pull_request_template.md)
8. **Wait for review** - Code owners will be automatically assigned
9. **Address review feedback** promptly
10. **Maintainer will merge** once approved and all checks pass

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

**Automated Git Hooks:**

This project uses Husky to automatically run quality checks before commits. The following hooks are configured:

1. **Pre-commit Hook** - Runs automatically when you commit:
   - ✅ Prevents direct commits to `main`/`master` branches
   - ✅ Runs ESLint with auto-fix on staged `.js`/`.ts` files
   - ✅ Runs Prettier on staged files (`.js`, `.ts`, `.json`, `.md`)
   - ❌ Blocks commit if checks fail

2. **Commit-msg Hook** - Validates commit message format:
   - ✅ Enforces [Conventional Commits](https://www.conventionalcommits.org/) format
   - ✅ Required format: `<type>(<scope>): <subject>`
   - ✅ Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`, `revert`, `merge`
   - ❌ Blocks commit if message format is invalid

**Examples of valid commit messages:**

```bash
git commit -m "feat(login): add remember me checkbox"
git commit -m "fix(api): resolve timeout issue"
git commit -m "docs(readme): update installation steps"
git commit -m "test(checkboxes): add negative scenarios"
```

**What happens if you try to commit to main:**

```bash
$ git commit -m "feat: my changes"
❌ Direct commits to 'main' branch are not allowed!

💡 Please create a feature branch instead:
   git checkout -b feat/your-feature-name

📚 See docs/BRANCHING-STRATEGY.md for branch naming conventions
```

**Bypassing hooks (not recommended):**

```bash
# Use --no-verify to skip hooks (only for emergencies)
git commit --no-verify -m "emergency fix"
```

**Verifying hook installation:**

After cloning the repository and running `npm install`, verify that git hooks are properly installed:

```bash
# Check if hooks are installed and configured correctly
npm run verify:hooks

# Expected output:
# 🎉 All git hooks are properly installed and configured!
#
# 📚 Hook Summary:
#    • pre-commit: Prevents commits to main/master, runs lint-staged
#    • commit-msg: Enforces Conventional Commits format
```

The `verify:hooks` script checks:

- ✅ `.husky` directory exists
- ✅ `pre-commit` hook exists with branch protection and lint-staged
- ✅ `commit-msg` hook exists with Conventional Commits validation
- ✅ `lint-staged` configuration is present in `package.json`

**Troubleshooting hooks:**

If hooks aren't working:

```bash
# Reinstall hooks
rm -rf .husky
npm install

# Verify installation
npm run verify:hooks
```

### Code Review Checklist

When reviewing code, check for:

- ✅ Follows naming conventions
- ✅ Includes appropriate comments/documentation
- ✅ Has tests covering new functionality
- ✅ No console.log statements (use debug logger instead)
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
