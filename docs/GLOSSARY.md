# PICKL Glossary 🥒

➤ [Home](../README.md)

A comprehensive glossary of BDD, Playwright, Cucumber, and testing terminology used throughout PICKL.

---

## Table of Contents

- [BDD & Testing Concepts](#bdd--testing-concepts)
- [Gherkin Language](#gherkin-language)
- [Cucumber Framework](#cucumber-framework)
- [Playwright Concepts](#playwright-concepts)
- [Framework Patterns](#framework-patterns)
- [Test Organization](#test-organization)
- [Browser Automation](#browser-automation)

---

## BDD & Testing Concepts

### BDD (Behavior-Driven Development)

A software development methodology that encourages collaboration between developers, QA, and non-technical stakeholders. Tests are written in natural language that describes the behavior of the application from the user's perspective.

**Example:**

```gherkin
Feature: User Login
  As a user
  I want to log in to my account
  So that I can access my dashboard
```

**Why it matters:** BDD helps create a shared understanding of requirements and reduces miscommunication between technical and non-technical team members.

**See also:** [Writing Tests Guide](WRITING-TESTS.md)

---

### End-to-End Testing (E2E)

Testing methodology that validates the entire application flow from start to finish, simulating real user scenarios across all integrated components.

**Example:** Testing a complete user journey from landing page → login → dashboard → logout.

**In PICKL:** We use Playwright to automate browser interactions for E2E tests.

---

### Test Automation

The practice of using software tools to execute tests automatically, rather than manually clicking through the application.

**Benefits:**

- Faster feedback
- Consistent test execution
- Enables CI/CD integration
- Frees QA team for exploratory testing

---

### Test Isolation

The principle that each test should be independent and not rely on or affect other tests.

**In PICKL:** Each scenario gets a fresh browser context and page instance via the Custom World pattern.

**See also:** [Custom World Pattern](#custom-world)

---

## Gherkin Language

### Gherkin

A business-readable, domain-specific language used to describe software behavior without detailing implementation. Uses keywords like `Feature`, `Scenario`, `Given`, `When`, `Then`.

**Example:**

```gherkin
Feature: Login
  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should see the dashboard
```

**File extension:** `.feature`

**See also:** [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)

---

### Feature

The top-level container in a Gherkin file that describes a high-level functionality or business requirement. Typically represents a page or feature in the application.

**Structure:**

```gherkin
Feature: [Title]
  [Optional description]

  Scenario: [Test case 1]
  Scenario: [Test case 2]
```

**Example:**

```gherkin
Feature: User Authentication
  As a user
  I want to authenticate securely
  So that I can access protected resources
```

---

### Scenario

A concrete example that illustrates a business rule or acceptance criteria. Each scenario is a single test case.

**Example:**

```gherkin
Scenario: Login with valid credentials
  Given I am on the login page
  When I enter username "tomsmith"
  And I enter password "SuperSecretPassword!"
  And I click the login button
  Then I should see the secure area page
```

**Best practice:** One scenario should test one requirement.

---

### Scenario Outline

A template scenario that runs multiple times with different data from an `Examples` table. Used for data-driven testing.

**Example:**

```gherkin
Scenario Outline: Login with different credentials
  Given I am on the login page
  When I enter username "<username>"
  And I enter password "<password>"
  Then I should see "<result>"

  Examples:
    | username | password              | result  |
    | tomsmith | SuperSecretPassword!  | success |
    | invalid  | wrongpassword         | error   |
```

**See also:** [Data-Driven Testing](#test-data)

---

### Steps

Individual actions or assertions in a scenario, starting with keywords: `Given`, `When`, `Then`, `And`, `But`.

**Step Types:**

- **Given**: Preconditions (setup/context)
- **When**: Actions (user interactions)
- **Then**: Assertions (expected outcomes)
- **And/But**: Conjunctions for readability

**Example:**

```gherkin
Given I am logged in
  And I am on the dashboard
When I click the profile button
Then I should see my profile page
  And the page title should be "My Profile"
```

---

### Background

A set of steps that run before each scenario in a feature file. Used to reduce duplication of common setup steps.

**Example:**

```gherkin
Feature: Shopping Cart
  Background:
    Given I am on the home page
    And I am logged in

  Scenario: Add item to cart
    When I add an item to cart
    Then the cart count should increase

  Scenario: Remove item from cart
    When I remove an item from cart
    Then the cart count should decrease
```

**Note:** Background runs before **each** scenario, not once per feature.

---

### Tags

Labels prefixed with `@` that categorize and filter scenarios. Used to organize tests and control execution.

**Common tags in PICKL:**

- `@smoke` - Quick validation tests
- `@regression` - Comprehensive test coverage
- `@positive` - Happy path scenarios
- `@negative` - Error/edge case scenarios
- `@skip` - Temporarily disabled tests

**Example:**

```gherkin
@smoke @positive
Scenario: Successful login
  Given I am on the login page
  When I enter valid credentials
  Then I should be logged in
```

**Running tagged tests:**

```bash
npm run test:smoke       # Run @smoke tests
TAGS="@positive" npm test  # Run @positive tests
TAGS="not @skip" npm test  # Exclude @skip tests
```

**See also:** [Running Tests Guide](RUNNING-TESTS.md#running-by-tags)

---

## Cucumber Framework

### Cucumber

An open-source BDD framework that executes specifications written in Gherkin. Acts as the test runner that connects Gherkin steps to code implementation.

**In PICKL:** We use `@cucumber/cucumber` as our test framework.

**Configuration file:** `cucumber.js`

---

### Step Definition

The JavaScript/TypeScript code that implements a Gherkin step. Uses regular expressions or Cucumber Expressions to match step text.

**Example:**

```typescript
Given('I am on the login page', async function () {
  const loginPage = this.getPageObject(LoginPage)
  await loginPage.goto()
})
```

**Pattern matching:**

```typescript
// Cucumber Expression with parameter
When('I enter username {string}', async function (username: string) {
  await loginPage.enterUsername(username)
})
```

**Location in PICKL:** `test/steps/` directory

**See also:** [Step Definitions Guide](https://cucumber.io/docs/cucumber/step-definitions/)

---

### World

A shared context object that holds state across step definitions within a single scenario. Each scenario gets a fresh World instance.

**Purpose:**

- Share data between steps
- Maintain browser/page instances
- Store test data
- Ensure test isolation

**See also:** [Custom World](#custom-world)

---

### Hook

Special functions that run at specific points in the test lifecycle (before/after scenarios, features, or steps).

**Types:**

- `BeforeAll` - Runs once before all scenarios
- `AfterAll` - Runs once after all scenarios
- `Before` - Runs before each scenario
- `After` - Runs after each scenario

**Example:**

```typescript
Before(async function (this: ICustomWorld) {
  // Launch browser and create page
  this.page = await browser.newPage()
})

After(async function (this: ICustomWorld) {
  // Cleanup: close page
  await this.page?.close()
})
```

**Location in PICKL:** `test/support/hooks.ts`

**See also:** [Hooks Documentation](ARCHITECTURE.md#hooks-lifecycle)

---

### Formatter

A Cucumber plugin that controls how test results are output (console, HTML, JSON, etc.).

**PICKL formatters:**

- `progress` - Shows progress bar
- `summary` - Displays test summary
- `html` - Generates HTML report
- `json` - Produces JSON for further processing

**Configuration in `cucumber.js`:**

```javascript
format: [
  'progress',
  'summary',
  'html:test-results/cucumber-report.html',
  'json:test-results/cucumber-report.json',
]
```

---

### Pickle

Cucumber's internal representation of a scenario after it's been parsed. Includes all scenario details (steps, tags, location).

**Usage:** Accessed in hooks to get scenario metadata.

```typescript
import Debug from 'debug'
const debug = Debug('framework:hooks')

Before(async function (this: ICustomWorld, { pickle }) {
  debug(`Starting scenario: ${pickle.name}`)
})
```

---

## Playwright Concepts

### Playwright

A modern end-to-end testing framework for web applications that provides cross-browser automation via a single API.

**Key features:**

- Multi-browser support (Chromium, Firefox, WebKit)
- Auto-wait for elements
- Network interception
- Mobile emulation
- Parallel execution

**Website:** [playwright.dev](https://playwright.dev)

---

### Browser

A browser instance (Chromium, Firefox, or WebKit) launched by Playwright.

**Example:**

```typescript
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ headless: false })
```

**In PICKL:** Browser is launched in the `BeforeAll` hook based on the `BROWSER` environment variable.

---

### Browser Context

An isolated browser session within a browser instance. Provides separate cookies, storage, and cache.

**Purpose:**

- Test isolation between scenarios
- Simulating multiple users
- Managing different login states

**Example:**

```typescript
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  locale: 'en-US',
})
```

**In PICKL:** Each scenario gets a fresh context via the `Before` hook.

**See also:** [Browser Context API](https://playwright.dev/docs/api/class-browsercontext)

---

### Page

A single browser tab or window. The primary interface for interacting with web pages.

**Common methods:**

- `page.goto(url)` - Navigate to URL
- `page.locator(selector)` - Find element
- `page.click(selector)` - Click element
- `page.fill(selector, text)` - Enter text
- `page.screenshot()` - Capture screenshot

**In PICKL:** Page instance is attached to Custom World and passed to Page Objects.

**See also:** [Page API](https://playwright.dev/docs/api/class-page)

---

### Locator

A Playwright object that represents a way to find element(s) on a page. Locators are lazy and auto-wait.

**Example:**

```typescript
const usernameInput = page.locator('#username')
const submitButton = page.locator('button[type="submit"]')
const heading = page.locator('h1')
```

**Auto-wait behavior:** Locators automatically wait for elements to be actionable before performing actions.

**Best practice:** Store locators as readonly properties in Page Objects.

**See also:** [Locators Guide](https://playwright.dev/docs/locators)

---

### Selector

A string used to identify elements on a page (CSS, XPath, text, etc.).

**Selector types:**

```typescript
// CSS selector
page.locator('#id')
page.locator('.class')
page.locator('div > button')

// Text selector
page.locator('text=Login')

// XPath selector
page.locator('xpath=//button[@type="submit"]')

// Role selector (recommended)
page.locator('role=button[name="Submit"]')
```

**Best practice:** Prefer role-based and data-testid selectors for stability.

---

### Auto-wait

Playwright's built-in mechanism that automatically waits for elements to be ready before performing actions.

**Waits for:**

- Element to be attached to DOM
- Element to be visible
- Element to be enabled
- Element to be stable (not animating)

**Example:**

```typescript
// No manual wait needed - Playwright auto-waits
await page.locator('#button').click()
```

**Benefit:** Reduces flaky tests caused by timing issues.

---

### Headless Mode

Running browser tests without a visible browser window. Default mode for CI/CD.

**Configuration in PICKL:**

```bash
# .env file
HEADLESS=true   # Run without visible browser
HEADLESS=false  # Show browser window (for debugging)
```

**Use cases:**

- CI/CD pipelines (headless)
- Local debugging (headed)

---

### Trace

A detailed recording of test execution including screenshots, DOM snapshots, network activity, and console logs.

**Enables:**

- Post-mortem debugging
- Understanding test failures
- Visual timeline of actions

**In PICKL:** Traces are captured on failure in the `After` hook.

**Viewing traces:** Use Playwright Trace Viewer

```bash
npx playwright show-trace test-results/traces/trace.zip
```

---

## Framework Patterns

### Page Object Model (POM)

A design pattern that creates an object repository for UI elements, separating test logic from page structure.

**Benefits:**

- Reusability
- Maintainability
- Reduces code duplication
- Centralized element definitions

**Example:**

```typescript
// Page Object
export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
  }
}
```

**Location in PICKL:** `pages/` directory

**See also:** [Architecture - Page Object Model](ARCHITECTURE.md#page-object-model)

---

### Custom World

PICKL's implementation of Cucumber's World pattern, providing typed access to Playwright instances.

**Interface:**

```typescript
export interface ICustomWorld extends World {
  page?: Page
  context?: BrowserContext
}
```

**Purpose:**

- Share browser instances across steps
- Maintain test state within a scenario
- Ensure proper TypeScript typing
- Enable test isolation

**Usage:**

```typescript
Given('I am on the login page', async function () {
  // Access page from World using helper methods
  const loginPage = this.getPageObject(LoginPage)
  await loginPage.goto()
})
```

**Location in PICKL:** `test/support/world.ts`

**See also:** [Architecture - Custom World Pattern](ARCHITECTURE.md#custom-world-pattern)

---

### Fixture

Reusable setup/teardown code or test data that can be shared across tests.

**Types:**

- **Test Fixtures:** Sample data for tests
- **Setup Fixtures:** Common preconditions
- **Playwright Fixtures:** Extend Playwright test functionality

**Example (Test Data):**

```typescript
// test/fixtures/testData.ts
export const TEST_USERS = {
  validUser: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
  invalidUser: {
    username: 'invalid',
    password: 'wrong',
  },
}
```

---

### Test Data

Input data used to drive test scenarios, often stored in separate files or tables.

**Approaches:**

1. **Scenario Outline Examples:**

```gherkin
Examples:
  | username | password |
  | user1    | pass1    |
  | user2    | pass2    |
```

2. **External files:**

```typescript
import { TEST_USERS } from '../fixtures/testData.js'
```

**Best practice:** Keep test data separate from test logic for maintainability.

---

## Test Organization

### Feature File

A `.feature` file containing Gherkin scenarios for a specific feature or page.

**Location in PICKL:** `test/features/`

**Naming convention:** `feature-name.feature` (e.g., `login.feature`, `checkboxes.feature`)

**Structure:**

```gherkin
Feature: [Feature name]
  [Feature description]

  Background:
    [Common setup steps]

  Scenario: [Test case 1]
    [Steps]

  Scenario: [Test case 2]
    [Steps]
```

---

### Step Definition File

A TypeScript file containing step definition implementations.

**Location in PICKL:** `test/steps/`

**Naming convention:** `feature-name.steps.ts` (e.g., `login.steps.ts`)

**Structure:**

```typescript
import { Given, When, Then } from '../support/step-helpers.js'

Given('step text', async function () {
  // Implementation
})

When('step text', async function () {
  // Implementation
})

Then('step text', async function () {
  // Implementation
})
```

---

### Page Object File

A TypeScript class representing a web page or component.

**Location in PICKL:** `pages/`

**Naming convention:** `PageName.ts` (e.g., `LoginPage.ts`)

**Structure:**

```typescript
import { Page, Locator } from '@playwright/test'

export class PageName {
  readonly page: Page
  readonly element: Locator

  constructor(page: Page) {
    this.page = page
    this.element = page.locator('#selector')
  }

  async actionMethod() {
    // Actions
  }

  async queryMethod(): Promise<string> {
    // Queries
  }
}
```

---

### Test Results

Output generated after test execution, including reports, screenshots, traces, and videos.

**Location in PICKL:** `test-results/` directory

**Contains:**

- `cucumber-report.html` - HTML test report
- `cucumber-report.json` - JSON results
- `screenshots/` - Failure screenshots
- `traces/` - Execution traces
- `videos/` - Test recordings (if enabled)

**Cleanup:** Use `npm run clean` or `npm run clean:all`

---

### Test Report

An HTML or JSON document summarizing test execution results.

**Generating reports:**

```bash
npm run report  # Generate and open HTML report
```

**Report includes:**

- Pass/fail summary
- Execution time
- Screenshots of failures
- Error messages
- Test trends

---

## Browser Automation

### Cross-browser Testing

Running the same tests across multiple browsers (Chromium, Firefox, WebKit) to ensure compatibility.

**In PICKL:**

```bash
npm run test:chromium  # Test on Chromium
npm run test:firefox   # Test on Firefox
npm run test:webkit    # Test on WebKit (Safari)
```

**Why it matters:** Different browsers may render or behave differently.

---

### Viewport

The visible area of a web page in the browser window.

**Configuration:**

```typescript
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
})
```

**Use cases:**

- Desktop testing: 1920x1080
- Tablet testing: 768x1024
- Mobile testing: 375x667

---

### Screenshot

An image capture of the browser viewport or specific element at a point in time.

**Usage:**

```typescript
// Full page screenshot
await page.screenshot({ path: 'screenshot.png', fullPage: true })

// Element screenshot
await element.screenshot({ path: 'element.png' })
```

**In PICKL:** Screenshots are automatically captured on test failure.

---

### Network Interception

Ability to monitor, modify, or mock network requests and responses.

**Use cases:**

- API mocking
- Performance testing
- Testing offline behavior

**Example:**

```typescript
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ users: [] }),
  })
})
```

---

### Wait Strategy

Methods to pause test execution until certain conditions are met.

**Types:**

1. **Auto-wait:** Playwright's default (recommended)
2. **Explicit wait:** Manual wait for condition

```typescript
await page.waitForSelector('#element')
await page.waitForLoadState('networkidle')
```

3. **Hard wait:** Fixed time delay (avoid)

```typescript
await page.waitForTimeout(5000) // Not recommended
```

**Best practice:** Rely on auto-wait whenever possible.

---

## Additional Terms

### CI/CD (Continuous Integration/Continuous Deployment)

Automated pipeline that builds, tests, and deploys code changes.

**PICKL in CI/CD:**

```bash
npm run clean:all  # Clean environment
npm run lint       # Code quality check
npm test           # Run tests
npm run report     # Generate report
```

---

### ESM (ECMAScript Modules)

Modern JavaScript module system using `import`/`export` syntax.

**In PICKL:** All code uses ESM (not CommonJS).

```typescript
// ESM syntax
import { LoginPage } from './pages/LoginPage.js'
export class CustomWorld extends World {}
```

**Note:** Always include `.js` extension in imports, even for TypeScript files.

---

### TypeScript

Strongly-typed superset of JavaScript that compiles to JavaScript.

**Benefits:**

- Type safety
- Better IDE support
- Catch errors at compile time
- Improved code documentation

**In PICKL:** All test code is written in TypeScript.

---

### npm Scripts

Pre-defined commands in `package.json` for common tasks.

**Key PICKL scripts:**

- `npm test` - Run tests
- `npm run test:smoke` - Run smoke tests
- `npm run report` - Generate report
- `npm run lint` - Check code quality
- `npm run format` - Format code
- `npm run clean:all` - Clean artifacts

**See also:** [npm Scripts Reference](CONTRIBUTING.md#available-npm-scripts)

---

### Debug Mode

Running tests with additional logging and visibility for troubleshooting.

**Methods:**

1. **Headed mode:** `HEADLESS=false npm test`
2. **Debug namespace:** `DEBUG=framework:* npm test`
3. **Playwright Inspector:** `PWDEBUG=1 npm test`
4. **VS Code Debugger:** Use breakpoints in IDE

**See also:** [Troubleshooting Guide](TROUBLESHOOTING.md#debugging-techniques)

---

## Cross-References

For more detailed information, see:

- [Getting Started](GETTING-STARTED.md) - Setup and installation
- [Writing Tests](WRITING-TESTS.md) - Gherkin syntax guide
- [Running Tests](RUNNING-TESTS.md) - Test execution options
- [Architecture](ARCHITECTURE.md) - Framework patterns and structure
- [API Reference](API-REFERENCE.md) - Complete API documentation
- [Contributing](CONTRIBUTING.md) - Development guidelines
- [Common Mistakes](COMMON-MISTAKES.md) - Pitfalls to avoid
- [Troubleshooting](TROUBLESHOOTING.md) - Solutions for common issues

---

**Need to add a term?** See [Contributing Guide](CONTRIBUTING.md) for how to suggest additions to this glossary.
