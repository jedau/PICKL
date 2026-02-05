# Common Mistakes in PICKL 🥒

A comprehensive guide to common mistakes when using PICKL and how to avoid them.

## 📋 Table of Contents

- [Async/Await Issues](#asyncawait-issues)
- [Page Initialization Errors](#page-initialization-errors)
- [Selector Problems](#selector-problems)
- [Timeout Issues](#timeout-issues)
- [Step Definition Mistakes](#step-definition-mistakes)
- [Page Object Antipatterns](#page-object-antipatterns)
- [Gherkin Mistakes](#gherkin-mistakes)
- [Test Data Problems](#test-data-problems)
- [Environment Configuration](#environment-configuration)
- [Debugging Oversights](#debugging-oversights)

---

## Async/Await Issues

### Mistake #1: Missing `await` keyword

**❌ Wrong:**

```typescript
Given('I am on the login page', async function (this: ICustomWorld) {
  const page = this.page!
  const loginPage = new LoginPage(page)
  loginPage.goto() // Missing await!
})
```

**✅ Correct:**

```typescript
Given('I am on the login page', async function (this: ICustomWorld) {
  const page = this.page!
  const loginPage = new LoginPage(page)
  await loginPage.goto() // With await
})
```

**Why it matters**: Without `await`, the step completes immediately without waiting for the page to load, causing subsequent steps to fail.

**How to catch it**: ESLint rule `@typescript-eslint/no-floating-promises` will catch this.

**If you see errors**: Check [Troubleshooting - Test Execution Errors](TROUBLESHOOTING.md#test-execution-errors) for solutions.

---

### Mistake #2: Using `.then()` instead of `await`

**❌ Wrong:**

```typescript
import Debug from 'debug'
const debug = Debug('framework:pages')

async enterUsername(username: string) {
  this.usernameInput.fill(username).then(() => {
    debug('Filled username')
  })
}
```

**✅ Correct:**

```typescript
import Debug from 'debug'
const debug = Debug('framework:pages')

async enterUsername(username: string) {
  await this.usernameInput.fill(username)
  debug('Filled username')
}
```

**Why it matters**: Mixing promises and async/await makes code harder to read and debug. Stick to async/await throughout PICKL.

---

### Mistake #3: Not marking functions as `async`

**❌ Wrong:**

```typescript
Given('I am on the login page', function (this: ICustomWorld) {
  // Function is not async, but contains await
  await this.page!.goto('/login') // TypeScript error
})
```

**✅ Correct:**

```typescript
Given('I am on the login page', async function (this: ICustomWorld) {
  await this.page!.goto('/login')
})
```

**Why it matters**: You can only use `await` inside `async` functions.

---

### Mistake #4: Running async operations in parallel accidentally

**❌ Wrong:**

```typescript
When('I fill the login form', async function (this: ICustomWorld) {
  const page = this.page!
  const loginPage = new LoginPage(page)

  // These run in parallel!
  loginPage.enterUsername('tomsmith')
  loginPage.enterPassword('password')
  loginPage.clickLogin()
})
```

**✅ Correct:**

```typescript
When('I fill the login form', async function (this: ICustomWorld) {
  const page = this.page!
  const loginPage = new LoginPage(page)

  // These run sequentially
  await loginPage.enterUsername('tomsmith')
  await loginPage.enterPassword('password')
  await loginPage.clickLogin()
})
```

**Why it matters**: Without `await`, all operations start immediately, causing race conditions and unpredictable behavior.

---

## Page Initialization Errors

### Mistake #5: Not checking page initialization

**❌ Wrong (No validation):**

```typescript
Given('I am on the login page', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page) // this.page might be undefined!
  await loginPage.goto()
})
```

**⚠️ Old Pattern (Verbose):**

```typescript
Given('I am on the login page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const loginPage = new LoginPage(this.page)
  await loginPage.goto()
})
```

**✅ Best: Use `this.getPageObject()` instance method:**

```typescript
import { Given } from '../support/step-helpers.js'

Given('I am on the login page', async function () {
  const loginPage = this.getPageObject(LoginPage)
  await loginPage.goto()
})
```

**Why this is best:**

- ✅ Eliminates boilerplate (reduces 9 lines to 2 lines)
- ✅ No need for explicit `this: ICustomWorld` typing
- ✅ No need to pass `this` as a parameter
- ✅ Type-safe page object instantiation
- ✅ Clear error messages if page is not initialized
- ✅ Consistent pattern across all step definitions

**Alternative: Use `this.getPage()` for direct page access:**

```typescript
import { When } from '../support/step-helpers.js'

When('I wait {int} milliseconds', async function (ms: number) {
  const page = this.getPage()
  await page.waitForTimeout(ms)
})
```

**Why it matters**: If the Before hook hasn't run or failed, `this.page` will be undefined, causing cryptic errors. The helpers catch this early with clear error messages.

**If you see errors**: For the error "Cannot read properties of undefined", see [Troubleshooting - Step Definition Errors](TROUBLESHOOTING.md#step-definition-errors).

---

### Mistake #6: Creating page objects outside step definitions

**❌ Wrong:**

```typescript
// At module level - BAD!
const loginPage = new LoginPage(page) // page doesn't exist yet

Given('I am on the login page', async function (this: ICustomWorld) {
  await loginPage.goto() // Uses wrong page instance
})
```

**✅ Correct:**

```typescript
import { Given } from '../support/step-helpers.js'

Given('I am on the login page', async function () {
  const loginPage = this.getPageObject(LoginPage) // Create fresh instance
  await loginPage.goto()
})
```

**Why it matters**: Page objects should be created within step definitions using the World's page instance to ensure proper isolation.

---

## Selector Problems

### Mistake #7: Using fragile selectors

**❌ Wrong:**

```typescript
export class LoginPage {
  readonly usernameInput: Locator

  constructor(page: Page) {
    this.page = page
    // Fragile - breaks if styling changes
    this.usernameInput = page.locator('body > div.container > div > form > input:nth-child(1)')
  }
}
```

**✅ Correct:**

```typescript
export class LoginPage {
  readonly usernameInput: Locator

  constructor(page: Page) {
    this.page = page
    // Robust - uses ID
    this.usernameInput = page.locator('#username')
  }
}
```

**Best Practice Hierarchy:**

1. IDs: `#username` (most stable)
2. Data attributes: `[data-testid="username"]`
3. Semantic attributes: `input[name="username"]`
4. Text content: `text=Username`
5. CSS selectors: `.username-field` (least stable)

---

### Mistake #8: Not using `readonly` for locators

**❌ Wrong:**

```typescript
export class LoginPage {
  usernameInput: Locator // Mutable!

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#username')
  }
}
```

**✅ Correct:**

```typescript
export class LoginPage {
  readonly usernameInput: Locator // Immutable

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#username')
  }
}
```

**Why it matters**: Locators should never be reassigned after initialization. `readonly` prevents accidental modifications.

---

### Mistake #9: Hardcoding indices without context

**❌ Wrong:**

```typescript
const firstCheckbox = page.locator('input').nth(0) // Which input? Why first?
```

**✅ Correct:**

```typescript
// Be specific
const checkboxes = page.locator('input[type="checkbox"]')
const firstCheckbox = checkboxes.nth(0)

// Or even better, use a method
getCheckbox(index: number): Locator {
  return this.page.locator(`input[type="checkbox"]:nth-of-type(${index})`)
}
```

---

## Timeout Issues

### Mistake #10: Not understanding Playwright's auto-waiting

**❌ Wrong:**

```typescript
async clickLogin() {
  // Unnecessary wait - Playwright already waits!
  await this.page.waitForTimeout(3000)
  await this.loginButton.click()
}
```

**✅ Correct:**

```typescript
async clickLogin() {
  // Playwright automatically waits for element to be actionable
  await this.loginButton.click()
}
```

**Why it matters**: Playwright has built-in auto-waiting. Explicit sleeps make tests slower and more brittle.

---

### Mistake #11: Using arbitrary timeouts

**❌ Wrong:**

```typescript
await page.waitForTimeout(5000) // Magic number!
```

**✅ Correct:**

```typescript
// Wait for specific condition
await page.waitForLoadState('networkidle')

// Or wait for element
await page.waitForSelector('#flash', { state: 'visible' })

// Or use custom wait utility
await waitForNetworkIdle(page)
```

**Why it matters**: Arbitrary timeouts are flaky. Wait for specific conditions instead.

---

### Mistake #12: Not increasing timeout for slow operations

**❌ Wrong:**

```typescript
// File upload might take longer than default 30s
await page.setInputFiles('#file-upload', 'large-file.zip')
```

**✅ Correct:**

```typescript
// Increase timeout for slow operations
await page.setInputFiles('#file-upload', 'large-file.zip', { timeout: 60000 })

// Or set globally in hooks
setDefaultTimeout(60000)
```

---

## Step Definition Mistakes

### Mistake #13: Including implementation details in step text

**❌ Wrong:**

```gherkin
When I click on the element with id "login-button"
And I wait for 2 seconds
And I check if the URL contains "/secure"
```

**✅ Correct:**

```gherkin
When I click the login button
Then I should see the secure area page
```

**Why it matters**: Gherkin should describe behavior, not implementation. Keep it readable for non-technical stakeholders.

---

### Mistake #14: Creating too many small step definitions

**❌ Wrong:**

```typescript
When('I enter username', ...)
When('I enter password', ...)
When('I click login', ...)
```

**✅ Better:**

```typescript
// More granular steps for flexibility
When('I enter username {string}', ...)
When('I enter password {string}', ...)
When('I click the login button', ...)

// But also provide a composite step for common flows
When('I login with username {string} and password {string}', async function(username, password) {
  const page = getPage(this)
  const loginPage = new LoginPage(page)
  await loginPage.login(username, password)
})
```

---

### Mistake #15: Putting assertions in When steps

**❌ Wrong:**

```typescript
When('I click the login button', async function (this: ICustomWorld) {
  const page = getPage(this)
  const loginPage = new LoginPage(page)
  await loginPage.clickLogin()

  // Assertion in When step - WRONG!
  expect(await loginPage.isOnSecureArea()).toBeTruthy()
})
```

**✅ Correct:**

```typescript
When('I click the login button', async function (this: ICustomWorld) {
  const page = getPage(this)
  const loginPage = new LoginPage(page)
  await loginPage.clickLogin()
  // No assertion - just action
})

Then('I should see the secure area page', async function (this: ICustomWorld) {
  const page = getPage(this)
  const loginPage = new LoginPage(page)
  expect(await loginPage.isOnSecureArea()).toBeTruthy()
})
```

**Why it matters**:

- **Given** = Setup
- **When** = Action (no assertions!)
- **Then** = Assertion

---

## Page Object Antipatterns

### Mistake #16: Putting assertions in page objects

**❌ Wrong:**

```typescript
export class LoginPage {
  async verifyOnSecureArea() {
    // Page objects should NOT contain assertions
    const heading = await this.pageHeading.textContent()
    expect(heading).toContain('Secure Area')
  }
}
```

**✅ Correct:**

```typescript
export class LoginPage {
  // Page object returns data
  async getPageHeading(): Promise<string> {
    return (await this.pageHeading.textContent()) ?? ''
  }

  // Or returns boolean for validation
  async isOnSecureArea(): Promise<boolean> {
    const heading = await this.getPageHeading()
    return heading.includes('Secure Area')
  }
}

// Assertion goes in step definition
Then('I should see the secure area page', async function (this: ICustomWorld) {
  const page = getPage(this)
  const loginPage = new LoginPage(page)
  expect(await loginPage.isOnSecureArea()).toBeTruthy()
})
```

**Why it matters**: Page objects should be reusable. Assertions tie them to specific test scenarios.

---

### Mistake #17: Not adding JSDoc comments

**❌ Wrong:**

```typescript
async enterUsername(username: string) {
  await this.usernameInput.fill(username)
}
```

**✅ Correct:**

```typescript
/**
 * Enter username into the username field
 * @param username - The username to enter
 */
async enterUsername(username: string) {
  await this.usernameInput.fill(username)
}
```

**Why it matters**: Good documentation helps others (and future you) understand the code.

---

### Mistake #18: Creating page objects for every tiny component

**❌ Wrong:**

```typescript
// Overkill for a simple button
export class SubmitButtonComponent {
  readonly button: Locator

  constructor(page: Page) {
    this.button = page.locator('button[type="submit"]')
  }

  async click() {
    await this.button.click()
  }
}
```

**✅ Correct:**

```typescript
// Keep it in the main page object
export class LoginPage {
  readonly loginButton: Locator

  async clickLogin() {
    await this.loginButton.click()
  }
}
```

**Rule of thumb**: Create separate page objects for distinct pages or complex reusable components, not for every element.

---

## Gherkin Mistakes

### Mistake #19: Writing scenarios that are too long

**❌ Wrong:**

```gherkin
Scenario: Complete user journey
  Given I am on the homepage
  When I click on products
  And I filter by category "Electronics"
  And I sort by price
  And I click on the first product
  And I add to cart
  And I click checkout
  And I enter shipping address
  And I enter payment details
  And I confirm order
  Then I should see order confirmation
  # 10+ steps - too long!
```

**✅ Correct:**

```gherkin
# Break into multiple focused scenarios
Scenario: Filter products by category
  Given I am on the products page
  When I filter by category "Electronics"
  Then I should see only electronics products

Scenario: Complete checkout process
  Given I have items in my cart
  When I complete the checkout process
  Then I should see order confirmation
```

**Why it matters**: Short, focused scenarios are easier to understand, maintain, and debug.

---

### Mistake #20: Not using Background effectively

**❌ Wrong:**

```gherkin
Scenario: Test 1
  Given I am on the login page
  When ...

Scenario: Test 2
  Given I am on the login page
  When ...

Scenario: Test 3
  Given I am on the login page
  When ...
```

**✅ Correct:**

```gherkin
Background:
  Given I am on the login page

Scenario: Test 1
  When ...

Scenario: Test 2
  When ...

Scenario: Test 3
  When ...
```

**Why it matters**: Background runs before each scenario, reducing duplication.

---

### Mistake #21: Using AND excessively

**❌ Wrong:**

```gherkin
Scenario: Login
  Given I am on the login page
  And the login form is visible
  And the remember me checkbox is unchecked
  When I enter username "tom"
  And I enter password "pass"
  And I click login
  Then I should see secure area
  And the flash message should appear
  And the URL should change
```

**✅ Correct:**

```gherkin
Scenario: Login
  Given I am on the login page
  When I login with username "tom" and password "pass"
  Then I should see the secure area with success message
```

**Why it matters**: Too many ANDs make scenarios hard to read. Combine related steps.

---

## Test Data Problems

### Mistake #22: Hardcoding test data everywhere

**❌ Wrong:**

```typescript
// Hardcoded in multiple places
await loginPage.login('tomsmith', 'SuperSecretPassword!')
// ... later in another file ...
await loginPage.login('tomsmith', 'SuperSecretPassword!')
```

**✅ Correct:**

```typescript
// test/fixtures/testData.ts
export const TEST_USERS = {
  valid: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
}

// In step definitions
import { TEST_USERS } from '../fixtures/testData.js'
await loginPage.login(TEST_USERS.valid.username, TEST_USERS.valid.password)
```

---

### Mistake #23: Not cleaning up test data

**❌ Wrong:**

```typescript
When('I create a new user', async function (this: ICustomWorld) {
  await createUser('testuser123')
  // User remains in system forever!
})
```

**✅ Correct:**

```typescript
When('I create a new user', async function (this: ICustomWorld) {
  const userId = await createUser('testuser123')

  // Store for cleanup
  if (!this.createdEntities) {
    this.createdEntities = []
  }
  this.createdEntities.push(userId)
})

// In After hook
After(async function (this: ICustomWorld) {
  // Clean up created entities
  if (this.createdEntities) {
    for (const userId of this.createdEntities) {
      await deleteUser(userId)
    }
  }
})
```

---

## Environment Configuration

### Mistake #24: Not using environment variables

**❌ Wrong:**

```typescript
const baseUrl = 'https://the-internet.herokuapp.com' // Hardcoded!
```

**✅ Correct:**

```typescript
const baseUrl = process.env.BASE_URL
if (!baseUrl) {
  throw new Error('BASE_URL environment variable is not set')
}
```

---

### Mistake #25: Committing .env file

**❌ Wrong:**

```bash
git add .env  # Contains sensitive data!
git commit -m "Add env file"
```

**✅ Correct:**

```bash
# .env is in .gitignore
git add .env.example  # Template only
git commit -m "Add env template"
```

---

## Debugging Oversights

### Mistake #26: Not taking screenshots on failure

**❌ Wrong:**

```typescript
After(async function (this: ICustomWorld, { result }) {
  // No screenshot capture!
  await this.page?.close()
})
```

**✅ Correct:**

```typescript
After(async function (this: ICustomWorld, { pickle, result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true })
    this.attach(screenshot, 'image/png')
  }
  await this.page?.close()
})
```

---

### Mistake #27: Ignoring trace files

**Wrong Approach:**

- Test fails
- Look at error message only
- Can't reproduce issue
- Give up

**✅ Correct Approach:**

- Test fails
- Check `test-results/traces/*.zip`
- Upload to https://trace.playwright.dev/
- See full timeline of actions
- Identify exact failure point

---

### Mistake #28: Running tests in headless mode while debugging

**❌ Wrong:**

```bash
# Hard to debug when you can't see what's happening
HEADLESS=true npm test
```

**✅ Correct:**

```bash
# Watch the browser to understand what's happening
HEADLESS=false npm test
```

---

## Quick Reference

### Before You Code Checklist

- [ ] Is my function marked as `async`?
- [ ] Am I using `await` for all async operations?
- [ ] Am I checking if `this.page` is initialized?
- [ ] Are my locators using robust selectors?
- [ ] Are my locators marked as `readonly`?
- [ ] Have I added JSDoc comments?
- [ ] Am I using the correct Given/When/Then pattern?
- [ ] Are my scenarios focused and concise?
- [ ] Am I using environment variables for configuration?
- [ ] Have I considered error handling?

### Before You Commit Checklist

- [ ] All tests passing locally?
- [ ] No linting errors? (`npm run lint`)
- [ ] Code formatted? (`npm run format`)
- [ ] No hardcoded credentials or sensitive data?
- [ ] `.env` file not committed?
- [ ] Meaningful commit message following Conventional Commits?
- [ ] All new code has JSDoc comments?

---

## Related Documentation

- [Troubleshooting Guide](TROUBLESHOOTING.md) - Reactive solutions for errors you encounter
- [Contributing Guide](CONTRIBUTING.md) - Best practices for code contributions
- [API Reference](API-REFERENCE.md) - Detailed API documentation for all classes
- [Architecture Guide](ARCHITECTURE.md) - Understanding framework patterns and internals
- [Learning Path](LEARNING-PATH.md) - Structured curriculum to learn these concepts
- [Training Exercises](TRAINING-EXERCISES.md) - Practice avoiding these mistakes

---

**Remember: Mistakes are proof that you are trying. The only real mistake is the one from which we learn nothing!** 🥒
