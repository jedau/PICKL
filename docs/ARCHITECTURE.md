# PICKL Architecture 🥒

This document explains the architectural patterns, design decisions, and internal workings of the PICKL framework.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Page Object Model](#page-object-model)
- [Custom World Pattern](#custom-world-pattern)
- [Hooks Lifecycle](#hooks-lifecycle)
- [Formatter System](#formatter-system)
- [Test Execution Flow](#test-execution-flow)
- [Configuration System](#configuration-system)

---

## Project Structure

```
PICKL/
├── .github/                    # GitHub configuration
│   └── pull_request_template.md
├── .vscode/                    # VS Code configuration
│   ├── extensions.json         # Recommended extensions
│   └── tasks.json              # Command palette tasks
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md         # This file
│   ├── BRANCHING-STRATEGY.md   # Git workflow
│   ├── CONTRIBUTING.md         # Contribution guide
│   ├── GETTING-STARTED.md      # Setup instructions
│   ├── NAMING-CONVENTION.md    # Naming standards
│   ├── PULL-REQUEST.md         # PR guidelines
│   ├── RUNNING-TESTS.md        # Test execution guide
│   └── WRITING-TESTS.md        # Test writing guide
├── pages/                      # Page Object Models
│   ├── LoginPage.ts
│   └── CheckboxesPage.ts
├── scripts/                    # Utility scripts
│   ├── run-test.ts             # Test runner
│   └── generate-report.ts      # Report generator
├── test/                       # Test files
│   ├── features/               # Gherkin feature files
│   │   ├── login.feature
│   │   └── checkboxes.feature
│   ├── steps/                  # Step definitions
│   │   ├── login.steps.ts
│   │   └── checkboxes.steps.ts
│   └── support/                # Test support files
│       ├── hooks.ts            # Cucumber hooks
│       ├── verbose-formatter.ts # Custom formatter
│       └── world.ts            # Custom World class
├── test-results/               # Test artifacts (gitignored)
│   ├── videos/
│   ├── traces/
│   ├── screenshots/
│   └── html-report/
├── types/                      # TypeScript type definitions
├── .env                        # Environment variables (gitignored)
├── .env.example                # Environment template
├── cucumber.js                 # Cucumber configuration
├── eslint.config.ts            # ESLint configuration
├── package.json                # Dependencies and scripts
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project overview
```

### Directory Responsibilities

| Directory        | Purpose                                            | Key Files                           |
| ---------------- | -------------------------------------------------- | ----------------------------------- |
| `pages/`         | Page Object Models - encapsulate page interactions | `*.ts` classes                      |
| `test/features/` | Gherkin feature files - describe test scenarios    | `*.feature` files                   |
| `test/steps/`    | Step definitions - implement Gherkin steps         | `*.steps.ts` files                  |
| `test/support/`  | Test infrastructure - hooks, world, formatters     | `hooks.ts`, `world.ts`              |
| `scripts/`       | Utility scripts for test execution and reporting   | `run-test.ts`, `generate-report.ts` |
| `docs/`          | Project documentation                              | `*.md` files                        |

---

## Page Object Model

The Page Object Model (POM) is a design pattern that creates an object repository for web elements. It helps make tests more maintainable and reduces code duplication.

### Pattern Structure

```typescript
import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for a specific page
 */
export class ExamplePage {
  // 1. Readonly references
  readonly page: Page

  // 2. Locators as readonly properties
  readonly elementLocator: Locator

  // 3. Constructor receives Page instance
  constructor(page: Page) {
    this.page = page
    this.elementLocator = page.locator('#element')
  }

  // 4. Navigation methods
  async goto() {
    await this.page.goto('/path')
  }

  // 5. Action methods
  async clickElement() {
    await this.elementLocator.click()
  }

  // 6. Query methods
  async getElementText(): Promise<string> {
    return (await this.elementLocator.textContent()) ?? ''
  }

  // 7. Validation methods
  async isElementVisible(): Promise<boolean> {
    return this.elementLocator.isVisible()
  }
}
```

### Key Principles

1. **Single Responsibility**: Each page object represents one page or component
2. **Encapsulation**: All page interactions happen through the page object
3. **Readonly Locators**: Locators are defined once and reused
4. **Return Values**: Query methods return data; action methods return void
5. **No Assertions**: Page objects don't contain test assertions (that's in step definitions)

### Example: LoginPage

```typescript
export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly flashMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('button[type="submit"]')
    this.flashMessage = page.locator('#flash')
  }

  // Navigation
  async goto() {
    await this.page.goto('/login')
  }

  // Individual actions
  async enterUsername(username: string) {
    await this.usernameInput.fill(username)
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  async clickLogin() {
    await this.loginButton.click()
  }

  // Composite action (combines multiple steps)
  async login(username: string, password: string) {
    await this.enterUsername(username)
    await this.enterPassword(password)
    await this.clickLogin()
  }

  // Query methods
  async getFlashMessage(): Promise<string> {
    const text = await this.flashMessage.textContent()
    return text?.replace('×', '').trim() ?? ''
  }

  // Validation helpers (not assertions)
  async isOnSecureArea(): Promise<boolean> {
    const heading = await this.pageHeading.textContent()
    return heading?.includes('Secure Area') ?? false
  }
}
```

### When to Create a New Page Object

Create a new page object when:

- You're testing a new page or route
- A component is complex enough to warrant its own abstraction
- You find yourself repeating locators across step definitions

---

## Custom World Pattern

The Custom World is Cucumber's way of sharing state between steps within a scenario. Each scenario gets a fresh World instance, ensuring test isolation.

### World Implementation

```typescript
// test/support/world.ts
import { World, IWorldOptions } from '@cucumber/cucumber'
import { BrowserContext, Page } from '@playwright/test'

export interface ICustomWorld extends World {
  page?: Page
  context?: BrowserContext
}

export class CustomWorld extends World implements ICustomWorld {
  page?: Page
  context?: BrowserContext

  constructor(options: IWorldOptions) {
    super(options)
  }
}
```

### How It Works

1. **Initialization**: Cucumber creates a new `CustomWorld` instance for each scenario
2. **Hook Attachment**: The `Before` hook attaches `page` and `context` to the world
3. **Step Access**: Step definitions access world via `this` binding
4. **Cleanup**: The `After` hook cleans up resources
5. **Isolation**: Each scenario gets a fresh instance (no shared state between scenarios)

### Using World in Step Definitions

```typescript
import { Given, When, Then } from '../support/step-helpers.js'

Given('I am on the login page', async function () {
  // 'this' is the CustomWorld instance for this scenario
  // Using getPageObject helper (recommended pattern)
  const loginPage = this.getPageObject(LoginPage)
  await loginPage.goto()
})
```

### Extending Custom World

You can add custom properties to store scenario-specific data:

```typescript
export interface ICustomWorld extends World {
  page?: Page
  context?: BrowserContext
  // Add custom properties
  testData?: Record<string, unknown>
  createdEntities?: string[]
}

// In step definitions
When('I create a new user', async function (this: ICustomWorld) {
  const userId = await createUser()

  // Store for later cleanup
  if (!this.createdEntities) {
    this.createdEntities = []
  }
  this.createdEntities.push(userId)
})
```

---

## Hooks Lifecycle

Hooks are functions that run at specific points in the test lifecycle. PICKL uses hooks for setup, teardown, and artifact collection.

### Hook Execution Order

```
BeforeAll
  ├── Before (Scenario 1)
  │   ├── Step 1
  │   ├── Step 2
  │   └── Step 3
  ├── After (Scenario 1)
  │
  ├── Before (Scenario 2)
  │   ├── Step 1
  │   ├── Step 2
  │   └── Step 3
  └── After (Scenario 2)
AfterAll
```

### BeforeAll Hook

Runs once before all scenarios. Used for global setup.

```typescript
BeforeAll(async function () {
  // Create directories for test artifacts
  const dirs = ['test-results/videos', 'test-results/traces', 'test-results/screenshots']

  for (const dir of dirs) {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true })
    }
  }
})
```

### Before Hook

Runs before each scenario. Sets up browser context and attaches to World.

```typescript
Before(async function (this: ICustomWorld, { pickle }): Promise<void> {
  // 1. Determine browser type
  const browserType = process.env.BROWSER ?? 'chromium'
  const headless = process.env.HEADLESS !== 'false'

  // 2. Launch browser
  browser = await chromium.launch({ headless })

  // 3. Create context with recording
  const context = await browser.newContext({
    baseURL: process.env.BASE_URL,
    recordVideo: { dir: 'test-results/videos' },
    viewport: { width: 1920, height: 1080 },
  })

  // 4. Start tracing
  await context.tracing.start({
    name: `${pickle.name}-${pickle.id}`,
    screenshots: true,
    snapshots: true,
  })

  // 5. Create page and attach to world
  const page = await context.newPage()
  this.page = page
  this.context = context
})
```

### After Hook

Runs after each scenario. Collects artifacts and cleans up resources.

```typescript
After(async function (this: ICustomWorld, { pickle, result }) {
  const { context, page } = this

  // 1. Stop tracing (always)
  const tracePath = `test-results/traces/${pickle.id}.zip`
  await context?.tracing.stop({ path: tracePath })

  // 2. Attach artifacts on failure
  if (result?.status === Status.FAILED) {
    // Screenshot
    if (page) {
      const screenshot = await page.screenshot({ fullPage: true })
      this.attach(screenshot, 'image/png')
    }

    // Video
    const video = page?.video()
    if (video) {
      const videoPath = await video.path()
      const videoBuffer = await readFile(videoPath)
      this.attach(videoBuffer, 'video/webm')
    }

    // Trace link
    this.attach(`<a href="https://trace.playwright.dev/">Open trace: ${tracePath}</a>`, 'text/html')
  }

  // 3. Cleanup
  await page?.close()
  await context?.close()
  await browser?.close()
})
```

### AfterAll Hook

Runs once after all scenarios. Used for global teardown.

```typescript
AfterAll(async function () {
  // Global cleanup if needed
  // Example: close database connections, clean up test data, etc.
})
```

### Hook Best Practices

- ✅ Keep hooks focused on setup/teardown
- ✅ Use `BeforeAll`/`AfterAll` for global resources
- ✅ Use `Before`/`After` for per-scenario resources
- ✅ Always clean up resources in `After` hooks
- ✅ Attach debugging artifacts on failure
- ❌ Don't put test logic in hooks
- ❌ Don't share state between scenarios via hooks

---

## Formatter System

Formatters control how test results are displayed during execution. PICKL uses a custom verbose formatter for real-time feedback.

### Formatter Architecture

```typescript
export default class VerboseFormatter extends Formatter {
  // Track execution state
  private passedCount = 0
  private failedCount = 0
  private skippedCount = 0
  // ... more counters

  constructor(options: IFormatterOptions) {
    super(options)

    // Subscribe to Cucumber events
    options.eventBroadcaster.on('envelope', (envelope: Envelope) => {
      // Handle different event types
      if (envelope.testRunStarted) {
        this.logTestRunStarted()
      }
      if (envelope.testCaseStarted) {
        this.logTestCaseStarted(envelope.testCaseStarted)
      }
      // ... more event handlers
    })
  }
}
```

### Event Flow

```
testRunStarted
  ├── testCaseStarted (Scenario 1)
  │   ├── testStepStarted (Step 1)
  │   ├── testStepFinished (Step 1)
  │   ├── testStepStarted (Step 2)
  │   ├── testStepFinished (Step 2)
  │   └── testCaseFinished (Scenario 1)
  │
  ├── testCaseStarted (Scenario 2)
  │   └── ...
  │
  └── testRunFinished
```

### Custom Formatter Features

1. **Real-time Updates**:

   ```typescript
   logTestStepStarted(testStepStarted: TestStepStarted) {
     // Show pending emoji without newline
     process.stdout.write(`⏳ ${stepText}`)
   }

   logTestStepFinished(testStepFinished: TestStepFinished) {
     // Update with final status using ANSI escape codes
     process.stdout.write(`\r\x1b[K${icon} ${stepText}\n`)
   }
   ```

2. **ANSI Escape Codes**:
   - `\r` - Carriage return (move to start of line)
   - `\x1b[K` - Clear line from cursor to end
   - Allows in-place updates: ⏳ → ✅

3. **Status Tracking**:

   ```typescript
   trackScenarioResult(worstTestStepResult: TestStepResult) {
     const { status } = worstTestStepResult

     if (status === TestStepResultStatus.PASSED) {
       this.scenariosPassed++
     } else if (status === TestStepResultStatus.FAILED) {
       this.scenariosFailed++
     } else if (status === TestStepResultStatus.SKIPPED) {
       this.scenariosSkipped++
     }
   }
   ```

4. **Custom Summary**:

   ```typescript
   import Debug from 'debug'
   const debug = Debug('framework:formatter')

   logTestRunFinished() {
     debug('\n' + '='.repeat(50))
     debug('Test Execution Summary:')
     debug('='.repeat(50))
     debug(`Scenarios: ${this.scenariosPassed} passed, ${this.scenariosFailed} failed, ${this.scenariosSkipped} skipped (${this.totalScenarios} total)`)
     debug(`Steps: ${this.passedCount} passed, ${this.failedCount} failed, ${this.skippedCount} skipped (${this.totalSteps} total)`)
     debug(`Duration: ${duration}s`)
     debug('='.repeat(50))
   }
   ```

### Emoji Indicators

| Status    | Scenario | Step (Pending) | Step (Final) |
| --------- | -------- | -------------- | ------------ |
| Running   | ▶️       | ⏳             | -            |
| Passed    | -        | -              | ✅           |
| Failed    | -        | -              | ❌           |
| Skipped   | -        | -              | ⊘            |
| Undefined | -        | -              | ⚠️           |

---

## Test Execution Flow

### High-Level Flow

```
1. Run npm test
   ↓
2. scripts/run-test.ts
   ├── Load .env file
   ├── Parse CLI arguments
   ├── Build cucumber-js command
   └── Execute with formatters
   ↓
3. Cucumber.js
   ├── Load configuration
   ├── Parse feature files
   ├── Match step definitions
   └── Execute scenarios
   ↓
4. For each scenario:
   ├── BeforeAll (once)
   ├── Before hook
   │   ├── Launch browser
   │   ├── Create context
   │   ├── Start tracing
   │   └── Attach page to World
   ├── Execute steps
   │   ├── Step definitions use World.page
   │   ├── Create page objects
   │   └── Perform actions/assertions
   ├── After hook
   │   ├── Stop tracing
   │   ├── Attach artifacts (if failed)
   │   └── Close browser
   └── AfterAll (once)
   ↓
5. Generate JSON report
   ↓
6. Run scripts/generate-report.ts
   ├── Read JSON report
   ├── Generate HTML with cucumber-html-reporter
   ├── Inject customizations (favicon, dark mode)
   └── Auto-open in browser
```

### Detailed Step Execution

```typescript
// 1. Feature file (Gherkin)
Scenario: Successful login
  Given I am on the login page
  When I enter username "tomsmith"
  Then I should see the secure area

// 2. Step definition matched
Given('I am on the login page', async function () {
  // 3. Access World via getPageObject helper
  // 4. Create Page Object (handled by getPageObject)
  const loginPage = this.getPageObject(LoginPage)

  // 5. Execute action
  await loginPage.goto()
})

// 6. Playwright executes browser automation
await page.goto('/login')

// 7. Step completes, formatter logs result
✅ Given I am on the login page
```

---

## Configuration System

### Configuration Hierarchy

```
1. Default values (hardcoded)
   ↓
2. cucumber.js configuration
   ↓
3. .env file
   ↓
4. CLI arguments (highest priority)
```

### Environment Variables (.env)

```bash
# Browser configuration
HEADLESS=true                    # Run headless
BROWSER=chromium                 # Browser choice
BASE_URL=https://example.com     # Application URL

# Test filtering
TAGS=not @skip                   # Skip certain tests

# Debugging
DEBUG=*                          # Enable debug logging
```

### Cucumber Configuration (cucumber.js)

```javascript
export default {
  default: {
    tags: process.env.TAGS || 'not @skip',
    paths: ['test/features/'],
    import: ['test/support/**/*.ts', 'test/steps/**/*.ts'],
    format: ['progress', 'json:test-results/cucumber-report.json'],
    parallel: 1,
    timeout: 60000,
    World: './test/support/world.ts',
  },
}
```

### CLI Arguments

```bash
# Tags override .env TAGS
npm test -- --tags @smoke

# Feature path
npm test -- test/features/login.feature

# Multiple options
npm test -- --tags "@smoke and not @skip" test/features/login.feature
```

### Priority Example

```bash
# .env file
TAGS=@regression

# Command
npm test -- --tags @smoke

# Result: Runs @smoke tests (CLI overrides .env)
```

---

## Extension Points

### Adding Custom Hooks

```typescript
// test/support/custom-hooks.ts
import { Before, After } from '@cucumber/cucumber'

// Tag-specific hooks
Before({ tags: '@api' }, async function () {
  // Setup for API tests
})

// Step-specific hooks
After({ tags: '@cleanup' }, async function () {
  // Custom cleanup
})
```

### Adding Custom Formatters

```typescript
// test/support/custom-formatter.ts
import { Formatter } from '@cucumber/cucumber'

export default class CustomFormatter extends Formatter {
  constructor(options) {
    super(options)
    // Subscribe to events
  }
}
```

### Adding Helper Utilities

```typescript
// test/utils/helpers.ts
export async function waitForElement(page: Page, selector: string) {
  await page.waitForSelector(selector, { timeout: 30000 })
}
```

---

## Additional Resources

- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Understanding the architecture helps you extend and maintain PICKL effectively! 🥒**
