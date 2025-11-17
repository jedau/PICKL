# PICKL API Reference 🥒

Complete API documentation for all classes, interfaces, and utilities in the PICKL framework.

## 📋 Table of Contents

- [Page Objects](#page-objects)
- [Test Support](#test-support)
- [Scripts](#scripts)
- [Type Definitions](#type-definitions)
- [Configuration](#configuration)

---

## Page Objects

Page Objects encapsulate page interactions and element locators. All page objects follow the Page Object Model pattern.

### LoginPage

**File**: `pages/LoginPage.ts`

Page Object Model for the login page at https://the-internet.herokuapp.com/login.

#### Constructor

```typescript
constructor(page: Page)
```

**Parameters**:

- `page` (Page): Playwright Page instance

**Example**:

```typescript
const loginPage = new LoginPage(page)
```

#### Properties

| Property        | Type      | Description                                |
| --------------- | --------- | ------------------------------------------ |
| `page`          | `Page`    | Playwright Page instance (readonly)        |
| `usernameInput` | `Locator` | Username input field locator (readonly)    |
| `passwordInput` | `Locator` | Password input field locator (readonly)    |
| `loginButton`   | `Locator` | Login button locator (readonly)            |
| `flashMessage`  | `Locator` | Flash message container locator (readonly) |
| `pageHeading`   | `Locator` | Page heading h2 locator (readonly)         |

#### Methods

##### `goto()`

Navigate to the login page.

```typescript
async goto(): Promise<void>
```

**Returns**: `Promise<void>`

**Example**:

```typescript
await loginPage.goto()
```

---

##### `enterUsername(username)`

Enter username into the username field.

```typescript
async enterUsername(username: string): Promise<void>
```

**Parameters**:

- `username` (string): The username to enter

**Returns**: `Promise<void>`

**Example**:

```typescript
await loginPage.enterUsername('tomsmith')
```

---

##### `enterPassword(password)`

Enter password into the password field.

```typescript
async enterPassword(password: string): Promise<void>
```

**Parameters**:

- `password` (string): The password to enter

**Returns**: `Promise<void>`

**Example**:

```typescript
await loginPage.enterPassword('SuperSecretPassword!')
```

---

##### `clickLogin()`

Click the login button.

```typescript
async clickLogin(): Promise<void>
```

**Returns**: `Promise<void>`

**Example**:

```typescript
await loginPage.clickLogin()
```

---

##### `login(username, password)`

Perform complete login action (composite method).

```typescript
async login(username: string, password: string): Promise<void>
```

**Parameters**:

- `username` (string): The username to login with
- `password` (string): The password to login with

**Returns**: `Promise<void>`

**Example**:

```typescript
await loginPage.login('tomsmith', 'SuperSecretPassword!')
```

---

##### `getFlashMessage()`

Get the flash message text (success or error).

```typescript
async getFlashMessage(): Promise<string>
```

**Returns**: `Promise<string>` - The flash message text without the close button

**Example**:

```typescript
const message = await loginPage.getFlashMessage()
// Returns: "You logged into a secure area!"
```

---

##### `getPageHeading()`

Get the current page heading text.

```typescript
async getPageHeading(): Promise<string>
```

**Returns**: `Promise<string>` - The page heading text

**Example**:

```typescript
const heading = await loginPage.getPageHeading()
// Returns: "Login Page" or "Secure Area"
```

---

##### `isOnLoginPage()`

Check if currently on the login page.

```typescript
async isOnLoginPage(): Promise<boolean>
```

**Returns**: `Promise<boolean>` - True if on login page, false otherwise

**Example**:

```typescript
const onLoginPage = await loginPage.isOnLoginPage()
expect(onLoginPage).toBeTruthy()
```

---

##### `isOnSecureArea()`

Check if currently on the secure area page.

```typescript
async isOnSecureArea(): Promise<boolean>
```

**Returns**: `Promise<boolean>` - True if on secure area, false otherwise

**Example**:

```typescript
const onSecureArea = await loginPage.isOnSecureArea()
expect(onSecureArea).toBeTruthy()
```

---

### CheckboxesPage

**File**: `pages/CheckboxesPage.ts`

Page Object Model for the checkboxes page at https://the-internet.herokuapp.com/checkboxes.

#### Constructor

```typescript
constructor(page: Page)
```

**Parameters**:

- `page` (Page): Playwright Page instance

**Example**:

```typescript
const checkboxesPage = new CheckboxesPage(page)
```

#### Properties

| Property      | Type      | Description                         |
| ------------- | --------- | ----------------------------------- |
| `page`        | `Page`    | Playwright Page instance (readonly) |
| `pageHeading` | `Locator` | Page heading h3 locator (readonly)  |

#### Methods

##### `goto()`

Navigate to the checkboxes page.

```typescript
async goto(): Promise<void>
```

**Returns**: `Promise<void>`

**Example**:

```typescript
await checkboxesPage.goto()
```

---

##### `getCheckbox(index)`

Get a specific checkbox locator by index.

```typescript
getCheckbox(index: number): Locator
```

**Parameters**:

- `index` (number): The checkbox index (1-based)

**Returns**: `Locator` - The checkbox locator

**Example**:

```typescript
const checkbox1 = checkboxesPage.getCheckbox(1)
await checkbox1.check()
```

---

##### `isChecked(index)`

Check if a specific checkbox is checked.

```typescript
async isChecked(index: number): Promise<boolean>
```

**Parameters**:

- `index` (number): The checkbox index (1-based)

**Returns**: `Promise<boolean>` - True if checked, false otherwise

**Example**:

```typescript
const checked = await checkboxesPage.isChecked(1)
expect(checked).toBe(false)
```

---

##### `check(index)`

Check (select) a specific checkbox.

```typescript
async check(index: number): Promise<void>
```

**Parameters**:

- `index` (number): The checkbox index (1-based)

**Returns**: `Promise<void>`

**Example**:

```typescript
await checkboxesPage.check(1)
```

---

##### `uncheck(index)`

Uncheck (deselect) a specific checkbox.

```typescript
async uncheck(index: number): Promise<void>
```

**Parameters**:

- `index` (number): The checkbox index (1-based)

**Returns**: `Promise<void>`

**Example**:

```typescript
await checkboxesPage.uncheck(2)
```

---

##### `toggle(index)`

Toggle a specific checkbox (check if unchecked, uncheck if checked).

```typescript
async toggle(index: number): Promise<void>
```

**Parameters**:

- `index` (number): The checkbox index (1-based)

**Returns**: `Promise<void>`

**Example**:

```typescript
await checkboxesPage.toggle(1)
```

---

##### `getAllCheckboxStates()`

Get the states of all checkboxes on the page.

```typescript
async getAllCheckboxStates(): Promise<boolean[]>
```

**Returns**: `Promise<boolean[]>` - Array of checkbox states

**Example**:

```typescript
const states = await checkboxesPage.getAllCheckboxStates()
// Returns: [false, true] for 2 checkboxes
```

---

## Test Support

### CustomWorld

**File**: `test/support/world.ts`

Custom World class that extends Cucumber's base World, providing typed access to Playwright browser instances.

#### Interface: ICustomWorld

```typescript
interface ICustomWorld extends World {
  page?: Page
  context?: BrowserContext
}
```

**Properties**:

- `page` (Page | undefined): Playwright Page instance for browser automation
- `context` (BrowserContext | undefined): Playwright BrowserContext for managing browser state

#### Class: CustomWorld

```typescript
class CustomWorld extends World implements ICustomWorld
```

**Constructor**:

```typescript
constructor(options: IWorldOptions)
```

**Parameters**:

- `options` (IWorldOptions): World options provided by Cucumber

**Usage in Step Definitions**:

```typescript
import { Given } from '@cucumber/cucumber'
import { ICustomWorld } from '../support/world.js'

Given('I am on the login page', async function (this: ICustomWorld) {
  const page = this.page!
  await page.goto('/login')
})
```

---

### Hooks

**File**: `test/support/hooks.ts`

Cucumber hooks for test lifecycle management.

#### `setDefaultTimeout(timeout)`

Set the default timeout for all hooks and steps.

```typescript
setDefaultTimeout(60000) // 60 seconds
```

**Parameters**:

- `timeout` (number): Timeout in milliseconds

---

#### `BeforeAll`

Runs once before all scenarios. Creates directories for test artifacts.

```typescript
BeforeAll(async function (): Promise<void>)
```

**Creates**:

- `test-results/videos/`
- `test-results/traces/`
- `test-results/screenshots/`

---

#### `Before`

Runs before each scenario. Launches browser and sets up context.

```typescript
Before(async function (this: ICustomWorld, { pickle }): Promise<void>)
```

**Actions**:

1. Determines browser type from environment
2. Launches browser (chromium, firefox, or webkit)
3. Creates browser context with video recording
4. Starts tracing for debugging
5. Creates page and attaches to World

**Environment Variables Used**:

- `BROWSER`: Browser type (default: chromium)
- `HEADLESS`: Headless mode (default: true)
- `BASE_URL`: Base URL for navigation

---

#### `After`

Runs after each scenario. Collects artifacts and cleans up resources.

```typescript
After(async function (this: ICustomWorld, { pickle, result }): Promise<void>)
```

**Actions**:

1. Stops tracing and saves trace file
2. On failure:
   - Takes full-page screenshot
   - Attaches video recording
   - Attaches trace file link
3. Closes page, context, and browser

**Artifacts Location**:

- Screenshots: `test-results/screenshots/`
- Videos: `test-results/videos/`
- Traces: `test-results/traces/`

---

#### `AfterAll`

Runs once after all scenarios. Available for global cleanup.

```typescript
AfterAll(async function (): Promise<void>)
```

---

### VerboseFormatter

**File**: `test/support/verbose-formatter.ts`

Custom Cucumber formatter providing real-time test execution feedback with emoji indicators.

#### Class: VerboseFormatter

```typescript
class VerboseFormatter extends Formatter
```

**Constructor**:

```typescript
constructor(options: IFormatterOptions)
```

#### Features

- **Real-time Updates**: Step status updates in-place using ANSI escape codes
- **Emoji Indicators**: Visual feedback for test progress
- **Scenario Tracking**: Counts passed, failed, and skipped scenarios
- **Step Tracking**: Counts passed, failed, and skipped steps
- **Custom Summary**: Comprehensive execution summary with duration

#### Emoji Indicators

| Status    | Scenario | Step (Pending) | Step (Final) |
| --------- | -------- | -------------- | ------------ |
| Running   | ▶️       | ⏳             | -            |
| Passed    | -        | -              | ✅           |
| Failed    | -        | -              | ❌           |
| Skipped   | -        | -              | ⊘            |
| Undefined | -        | -              | ⚠️           |

#### Private Properties

| Property           | Type   | Description                 |
| ------------------ | ------ | --------------------------- |
| `passedCount`      | number | Number of passed steps      |
| `failedCount`      | number | Number of failed steps      |
| `skippedCount`     | number | Number of skipped steps     |
| `totalSteps`       | number | Total number of steps       |
| `scenariosPassed`  | number | Number of passed scenarios  |
| `scenariosFailed`  | number | Number of failed scenarios  |
| `scenariosSkipped` | number | Number of skipped scenarios |
| `totalScenarios`   | number | Total number of scenarios   |
| `startTime`        | number | Test run start timestamp    |

#### Methods

##### `logTestRunStarted()`

Logs the start of the test run.

**Output**:

```
Starting test execution...
```

---

##### `logTestCaseStarted(testCaseStarted)`

Logs the start of a scenario.

**Parameters**:

- `testCaseStarted` (TestCaseStarted): Test case started event

**Output**:

```
▶️ Scenario: Successful login with valid credentials
```

---

##### `logTestStepStarted(testStepStarted)`

Logs the start of a step with pending indicator.

**Parameters**:

- `testStepStarted` (TestStepStarted): Test step started event

**Output** (without newline):

```
⏳ Given I am on the login page
```

---

##### `logTestStepFinished(testStepFinished)`

Updates the step with final status indicator.

**Parameters**:

- `testStepFinished` (TestStepFinished): Test step finished event

**Output** (replaces pending line):

```
✅ Given I am on the login page
```

---

##### `logTestRunFinished()`

Logs the test execution summary.

**Output**:

```
==================================================
Test Execution Summary:
==================================================
Scenarios: 5 passed, 0 failed, 1 skipped (6 total)
Steps: 30 passed, 0 failed, 6 skipped (36 total)
Duration: 12.5s
==================================================
```

---

## 📜 Scripts

### run-test.ts

**File**: `scripts/run-test.ts`

Unified test runner that loads environment variables, parses CLI arguments, and executes Cucumber tests.

#### Functionality

1. **Environment Loading**: Silently loads `.env` file using `dotenv/config`
2. **Argument Parsing**: Processes CLI arguments for tags and feature paths
3. **Priority Handling**: CLI `--tags` overrides `TAGS` environment variable
4. **Command Building**: Constructs single-line `cucumber-js` command
5. **Execution**: Runs tests with custom verbose formatter and JSON output

#### CLI Arguments

| Argument     | Description               | Example                       |
| ------------ | ------------------------- | ----------------------------- |
| `--tags`     | Filter scenarios by tags  | `--tags "@smoke"`             |
| Feature path | Run specific feature file | `test/features/login.feature` |

#### Environment Variables

| Variable   | Description        | Default     |
| ---------- | ------------------ | ----------- |
| `TAGS`     | Default tag filter | `not @skip` |
| `BROWSER`  | Browser type       | `chromium`  |
| `HEADLESS` | Headless mode      | `true`      |
| `BASE_URL` | Application URL    | Required    |

#### Usage

```bash
# Run all tests
npm test

# Run with specific tags
npm test -- --tags @smoke

# Run specific feature
npm test -- test/features/login.feature

# Combine tags and feature
npm test -- --tags "@smoke and not @skip" test/features/login.feature
```

---

### generate-report.ts

**File**: `scripts/generate-report.ts`

Generates HTML test report with customizations (dark mode toggle, pickle favicon).

#### Functionality

1. **Report Generation**: Uses `cucumber-html-reporter` with Bootstrap theme
2. **Favicon Injection**: Replaces default favicon with pickle emoji SVG
3. **Dark Mode**: Injects dark mode CSS and toggle functionality
4. **Metadata**: Adds test run information (browser, platform, timestamp)
5. **Auto-open**: Opens report in default browser

#### Report Options

| Option                   | Value                                 | Description                          |
| ------------------------ | ------------------------------------- | ------------------------------------ |
| `theme`                  | `bootstrap`                           | Bootstrap theme                      |
| `jsonFile`               | `test-results/cucumber-report.json`   | Input JSON file                      |
| `output`                 | `test-results/html-report/index.html` | Output HTML file                     |
| `reportSuiteAsScenarios` | `true`                                | Group by scenarios                   |
| `scenarioTimestamp`      | `true`                                | Include timestamps                   |
| `launchReport`           | `false`                               | Don't auto-open (handled separately) |

#### Customizations

**Pickle Favicon**:

```svg
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
  <text x='0' y='14' font-size='14'>🥒</text>
</svg>
```

**Dark Mode Toggle**:

- Button text: 🌙 Switch to Dark mode / ☀️ Switch to Light mode
- Persists preference in `localStorage`
- Custom dark theme CSS with VS Code-like colors

#### Usage

```bash
# Generate report
npm run report

# After tests complete, report is auto-generated and opened
```

---

## Type Definitions

### multiple-cucumber-html-reporter.d.ts

**File**: `types/multiple-cucumber-html-reporter.d.ts`

TypeScript type definitions for the cucumber-html-reporter package.

**Note**: This file may be removed in future versions as `cucumber-html-reporter` is the primary reporter.

---

---

## Configuration

### Cucumber Configuration

### cucumber.js

**File**: `cucumber.js`

Cucumber configuration with multiple profiles for different browsers.

#### Default Profile

```javascript
{
  tags: process.env.TAGS || 'not @skip',
  formatOptions: {
    snippetInterface: 'async-await'
  },
  paths: ['test/features/'],
  import: ['test/support/**/*.ts', 'test/steps/**/*.ts'],
  dryRun: false,
  format: [
    'progress',
    'summary',
    'html:test-results/cucumber-report.html',
    'json:test-results/cucumber-report.json'
  ],
  parallel: 1,
  timeout: 60000,
  World: './test/support/world.ts'
}
```

#### Browser Profiles

- `chromium`: Runs tests in Chromium
- `firefox`: Runs tests in Firefox
- `webkit`: Runs tests in WebKit

Each profile sets `worldParameters.browser` to the respective browser type.

---

### playwright.config.ts

**File**: `playwright.config.ts`

Playwright configuration (primarily used for Playwright-specific features).

**Note**: Test execution is managed by Cucumber, not Playwright Test Runner. This config is for Playwright features like browser context, screenshots, and videos.

#### Key Configuration

| Option          | Value                  | Description                |
| --------------- | ---------------------- | -------------------------- |
| `fullyParallel` | `false`                | Run scenarios sequentially |
| `retries`       | `0` (2 on CI)          | Retry failed tests         |
| `workers`       | `1` (undefined on CI)  | Number of parallel workers |
| `baseURL`       | `process.env.BASE_URL` | Base URL for navigation    |
| `trace`         | `on-first-retry`       | Trace collection           |
| `screenshot`    | `only-on-failure`      | Screenshot capture         |
| `video`         | `retain-on-failure`    | Video recording            |

---

### tsconfig.json

**File**: `tsconfig.json`

TypeScript compiler configuration.

#### Key Settings

| Option             | Value    | Description                             |
| ------------------ | -------- | --------------------------------------- |
| `target`           | `ES2022` | ECMAScript target version               |
| `module`           | `ES2022` | Module system                           |
| `moduleResolution` | `node`   | Module resolution strategy              |
| `strict`           | `true`   | Enable strict type checking             |
| `esModuleInterop`  | `true`   | Enable ESM interop                      |
| `skipLibCheck`     | `true`   | Skip type checking of declaration files |

---

### eslint.config.ts

**File**: `eslint.config.ts`

ESLint configuration using flat config format.

#### Rules

- TypeScript ESLint recommended rules
- Prettier integration (no conflicting rules)
- Custom rules:
  - `no-console`: Warn (allow `console.warn` and `console.error`)
  - `prefer-const`: Error
  - `no-var`: Error
  - `eqeqeq`: Error (always use `===`)
  - `curly`: Error (always use braces)

---

## Usage Examples

### Complete Test Flow

```typescript
// 1. Feature file
Feature: Login
  Scenario: Successful login
    Given I am on the login page
    When I enter username "tomsmith"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should see the secure area page

// 2. Step definitions
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ICustomWorld } from '../support/world.js'
import { LoginPage } from '../../pages/LoginPage.js'

Given('I am on the login page', async function (this: ICustomWorld) {
  const page = this.page!
  const loginPage = new LoginPage(page)
  await loginPage.goto()
})

When('I enter username {string}', async function (this: ICustomWorld, username: string) {
  const page = this.page!
  const loginPage = new LoginPage(page)
  await loginPage.enterUsername(username)
})

// ... more step definitions

Then('I should see the secure area page', async function (this: ICustomWorld) {
  const page = this.page!
  const loginPage = new LoginPage(page)
  const isSecure = await loginPage.isOnSecureArea()
  expect(isSecure).toBeTruthy()
})
```

---

## 🔗 Related Documentation

- [Architecture Guide](ARCHITECTURE.md) - Framework architecture and patterns
- [Contributing Guide](CONTRIBUTING.md) - How to contribute to PICKL
- [Training Exercises](TRAINING-EXERCISES.md) - Hands-on exercises for learning

---

**For questions or issues, please refer to the documentation or create an issue on GitHub.** 🥒
