# PICKL Troubleshooting Guide 🥒

Comprehensive solutions for common issues you may encounter while using PICKL.

## Table of Contents

- [Setup Issues](#setup-issues)
- [Test Execution Errors](#test-execution-errors)
- [Browser Issues](#browser-issues)
- [Selector Issues](#selector-issues)
- [Timeout Errors](#timeout-errors)
- [Step Definition Errors](#step-definition-errors)
- [Report Generation Issues](#report-generation-issues)
- [Environment Configuration](#environment-configuration)
- [TypeScript Errors](#typescript-errors)
- [Debugging Techniques](#debugging-techniques)
- [FAQ](#faq)

---

## Setup Issues

> **Note**: For initial setup guidance, see the [Getting Started Guide](GETTING-STARTED.md). This section focuses on troubleshooting setup problems.

### Error: "Cannot find module '@cucumber/cucumber'"

**Symptom**:

```
Error: Cannot find module '@cucumber/cucumber'
```

**Cause**: Dependencies not installed or node_modules corrupted.

**Solution**:

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Verify installation
npm test -- --dry-run
```

---

### Error: "command not found: tsx"

**Symptom**:

```bash
$ npm test
'tsx' is not recognized as an internal or external command
```

**Cause**: Local dependencies not in PATH or tsx not installed.

**Solution**:

```bash
# Reinstall dependencies
npm install

# Verify tsx is installed
npm list tsx

# If missing, install explicitly
npm install --save-dev tsx

# Use npm scripts (they auto-use local packages)
npm test
```

---

### Error: "Module parse failed: Unexpected token"

**Symptom**:

```
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type
```

**Cause**: TypeScript files not being transpiled correctly.

**Solution**:

```bash
# Check tsconfig.json exists
cat tsconfig.json

# Verify module type in package.json
cat package.json | grep '"type"'
# Should show: "type": "module"

# Check Node version
node --version
# Should be v22.22.0 or compatible

# Use correct Node version
nvm use
```

---

## Test Execution Errors

> **Prevention Tip**: Many test execution errors are caused by common coding mistakes. See [Common Mistakes Guide](COMMON-MISTAKES.md) to avoid these issues.

### Error: "Page is not initialized"

**Symptom**:

```
Error: Page is not initialized
    at Given (test/steps/login.steps.ts:10:5)
```

**Cause**: Trying to use `this.page` before the Before hook has run.

**Solution**:

```typescript
// Always check if page is initialized
Given('I am on the login page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized. Ensure Before hook has run.')
  }
  const loginPage = new LoginPage(this.page)
  await loginPage.goto()
})

// ✅ Best - use getPageObject helper
import { Given } from '../support/step-helpers.js'

Given('I am on the login page', async function () {
  const loginPage = this.getPageObject(LoginPage) // Throws if page not initialized
  await loginPage.goto()
})
```

**Prevention**: To avoid this error, always check page initialization. See [Common Mistakes - Not checking page initialization](COMMON-MISTAKES.md#mistake-5-not-checking-page-initialization).

---

### Error: "Undefined step"

**Symptom**:

```
Undefined. Implement with the following snippet:

  When('I perform an action', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
```

**Cause**: Step definition not implemented or not imported.

**Solutions**:

1. **Implement the step**:

```typescript
// test/steps/your-feature.steps.ts
When('I perform an action', async function (this: ICustomWorld) {
  // Your implementation
})
```

2. **Check import paths in cucumber.js**:

```javascript
import: ['test/support/**/*.ts', 'test/steps/**/*.ts']
```

3. **Verify file extension**:

- Step files should be `*.steps.ts`
- Located in `test/steps/` directory

4. **Check for typos**:

```gherkin
# Feature file
When I perform an action  # Must match exactly

# Step definition
When('I perform an action', ...)  # Exact match required
```

---

### Error: "Expected string to contain..."

**Symptom**:

```
Error: expect(received).toContain(expected)

Expected substring: "You logged into"
Received string:    "Your username is invalid!"
```

**Cause**: Assertion failure - test found different content than expected.

**Debug Steps**:

```typescript
// Use debug logger to see actual values
import Debug from 'debug'
const debug = Debug('test:steps')

Then('I should see a success message {string}', async function (expectedMessage: string) {
  const loginPage = this.getPageObject(LoginPage)
  const actualMessage = await loginPage.getFlashMessage()

  debug('Expected:', expectedMessage)
  debug('Actual:', actualMessage)

  expect(actualMessage).toContain(expectedMessage)
})
```

**Common Causes**:

- Test data is wrong (check username/password)
- Page state is not what you expect
- Previous step failed silently
- Element selector changed

---

## Browser Issues

### Error: "Failed to attach video: ENOENT"

**Symptom**:

```
Failed to attach video: ENOENT: no such file or directory, open 'test-results/videos/...'
```

**Cause**: Video recording directory doesn't exist or Playwright browsers not installed.

**Solution**:

```bash
# 1. Install Playwright browsers (most common cause)
npx playwright install

# 2. Manually create directories (if needed)
mkdir -p test-results/videos test-results/traces test-results/screenshots

# Windows (PowerShell):
New-Item -ItemType Directory -Force -Path test-results/videos, test-results/traces, test-results/screenshots

# 3. Run tests
npm test
```

**Why this happens:**

- Fresh repository clones don't have `test-results` directories (gitignored)
- Tests fail before `BeforeAll` hook creates directories
- Playwright browsers not installed causes early test failures

**Prevention:**

The `BeforeAll` hook automatically creates directories, but only if tests start successfully. Always run `npx playwright install` after cloning.

---

### Error: "Executable doesn't exist"

**Symptom**:

```
browserType.launch: Executable doesn't exist at /path/to/chromium
```

**Cause**: Playwright browsers not installed.

**Solution**:

```bash
# Install all browsers
npx playwright install

# Or specific browser
npx playwright install chromium

# With dependencies (Linux)
npx playwright install --with-deps chromium
```

---

### Error: "Browser closed unexpectedly"

**Symptom**:

```
Browser closed unexpectedly
Error: Protocol error (Target.createTarget): Target closed.
```

**Causes & Solutions**:

1. **System resources**:

```bash
# Check available memory
free -h  # Linux/Mac
wmic OS get FreePhysicalMemory  # Windows

# Reduce parallel workers
# In cucumber.js
parallel: 1  # Run tests sequentially
```

2. **Browser crash**:

```bash
# Run in headed mode to observe
HEADLESS=false npm test

# Check for system compatibility
npx playwright install --dry-run
```

3. **Timeout during launch**:

```typescript
// Increase launch timeout in Before hook
const browser = await chromium.launch({
  headless,
  timeout: 60000, // Increase from default 30000
})
```

---

### Browser doesn't close after tests

**Symptom**: Browser windows remain open after test execution.

**Cause**: After hook not running or error in cleanup.

**Solution**:

```typescript
After(async function (this: ICustomWorld, { pickle, result }) {
  try {
    // ... artifact collection ...
  } finally {
    // Always cleanup, even if error occurs
    await this.page?.close()
    await this.context?.close()
    await browser?.close()
  }
})
```

---

## Selector Issues

### Error: "Timeout exceeded while waiting for element"

**Symptom**:

```
TimeoutError: page.locator: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#username')
```

**Causes & Solutions**:

1. **Selector is wrong**:

```typescript
// Check selector in browser DevTools
// Open site, press F12, use Console:
document.querySelector('#username')

// If null, selector is wrong. Try:
document.querySelector('input[name="username"]')
```

2. **Element not visible yet**:

```typescript
// Wait for page to load
await page.waitForLoadState('networkidle')

// Or wait for specific element
await page.waitForSelector('#username', { state: 'visible' })
```

3. **Element in iframe**:

```typescript
// Locate iframe first
const frame = page.frameLocator('#iframe-id')
const input = frame.locator('#username')
await input.fill('tomsmith')
```

4. **Dynamic element**:

```typescript
// Element ID changes? Use more stable selector
// Instead of: '#element-12345'
// Use: '[data-testid="username"]'
// Or: 'input[placeholder="Username"]'
```

---

### Error: "Multiple elements match selector"

**Symptom**:

```
Error: strict mode violation: locator('button') resolved to 2 elements
```

**Cause**: Selector matches multiple elements.

**Solutions**:

```typescript
// Be more specific
// ❌ Wrong
page.locator('button')

// ✅ Correct - use unique attribute
page.locator('button[type="submit"]')

// ✅ Or get first/nth element
page.locator('button').first()
page.locator('button').nth(1)

// ✅ Or use text
page.locator('button:has-text("Login")')

// ✅ Best - use unique ID or data-testid
page.locator('#login-button')
page.locator('[data-testid="login-btn"]')
```

---

## Timeout Errors

### Error: "Test timeout exceeded"

**Symptom**:

```
Error: Test timeout of 60000ms exceeded
```

**Causes & Solutions**:

1. **Increase timeout globally**:

```typescript
// test/support/hooks.ts
setDefaultTimeout(120000) // 2 minutes
```

2. **Increase timeout for specific step**:

```typescript
Given('I perform a slow operation', { timeout: 120000 }, async function (this: ICustomWorld) {
  // Implementation
})
```

3. **Optimize slow operations**:

```typescript
// Instead of waiting arbitrary time
await page.waitForTimeout(10000) // ❌ Slow

// Wait for condition
await page.waitForLoadState('networkidle') // ✅ Fast
```

---

### Tests hang indefinitely

**Symptom**: Tests start but never complete.

**Causes & Solutions**:

1. **Missing await**:

```typescript
// ❌ Missing await - step completes immediately
When('I click login', async function () {
  const loginPage = this.getPageObject(LoginPage)
  loginPage.clickLogin() // Missing await!
})

// ✅ With await
When('I click login', async function () {
  const loginPage = this.getPageObject(LoginPage)
  await loginPage.clickLogin()
})
```

2. **Browser not closing**:

```bash
# Check for orphaned browser processes
ps aux | grep chromium

# Kill if necessary
pkill -f chromium
```

3. **Network request never completes**:

```typescript
// Set navigation timeout
await page.goto('/login', { timeout: 30000 })

// Or wait for specific state
await page.goto('/login', { waitUntil: 'domcontentloaded' })
```

---

## Step Definition Errors

### Error: "cannot read property 'page' of undefined"

**Symptom**:

```
TypeError: Cannot read property 'page' of undefined
```

**Cause**: Not using function binding (`this`) correctly.

**Solution**:

```typescript
// ❌ Arrow function loses 'this' context
Given('I am on the login page', async (this: ICustomWorld) => {
  // 'this' is undefined!
})

// ✅ Regular function preserves 'this'
Given('I am on the login page', async function (this: ICustomWorld) {
  // 'this' refers to CustomWorld
  const page = this.page!
})
```

---

### Error: "Step implementation missing required argument"

**Symptom**:

```
Error: Step "When I enter username {string}" is missing the username parameter
```

**Cause**: Parameter in step definition doesn't match Gherkin expression.

**Solution**:

```typescript
// ✅ Correct - parameter names can differ, position matters
When('I enter username {string}', async function (this: ICustomWorld, username: string) {
  // 'username' is the value from feature file
})

// ❌ Wrong - missing parameter
When('I enter username {string}', async function (this: ICustomWorld) {
  // No username parameter!
})

// ✅ Multiple parameters
When(
  'I login with username {string} and password {string}',
  async function (this: ICustomWorld, user: string, pass: string) {
    // Parameters match in order
  },
)
```

---

## Report Generation Issues

### Error: "No report generated"

**Symptom**: Running `npm run report` produces no output or errors.

**Cause**: JSON report file missing or empty.

**Solution**:

```bash
# Check if JSON report exists
ls -la test-results/cucumber-report.json

# If missing, run tests first
npm test

# Then generate report
npm run report

# Check for errors in report generation
node scripts/generate-report.ts
```

---

### Error: "Cannot read json file"

**Symptom**:

```
Error: ENOENT: no such file or directory
```

**Cause**: Test results directory doesn't exist or JSON is corrupted.

**Solution**:

```bash
# Verify JSON is valid
cat test-results/cucumber-report.json | json_pp

# Or use Node
node -e "console.log(JSON.parse(require('fs').readFileSync('test-results/cucumber-report.json', 'utf8')))"

# If corrupted, re-run tests
npm run test:clean
npm run report
```

---

### Report doesn't open automatically

**Symptom**: Report generates but doesn't open in browser.

**Solution**:

```bash
# Manually open report
# Windows
start test-results/html-report/index.html

# Mac
open test-results/html-report/index.html

# Linux
xdg-open test-results/html-report/index.html

# Or use file:// URL in browser
file:///full/path/to/test-results/html-report/index.html
```

---

---

## Environment Configuration

### Error: "BASE_URL is undefined"

**Symptom**:

```
Error: BASE_URL environment variable is not set
```

**Solution**:

```bash
# Create .env file if missing
cp .env.example .env

# Edit .env
nano .env

# Add BASE_URL
BASE_URL=https://the-internet.herokuapp.com

# Verify it's loaded
node -e "require('dotenv').config(); console.log(process.env.BASE_URL)"
```

---

### Environment variables not loading

**Symptom**: Tests use default values instead of .env values.

**Cause**: dotenv not configured correctly.

**Solution**:

```typescript
// Ensure dotenv loads before anything else
// scripts/run-test.ts
import 'dotenv/config' // Must be first import

// Or in test files
import 'dotenv/config'
import { Given } from '@cucumber/cucumber'
```

---

### TAGS environment variable ignored

**Symptom**: Tests run all scenarios instead of filtered by tag.

**Solution**:

```bash
# CLI tags override .env TAGS
npm test -- --tags @smoke

# To use .env TAGS, don't pass CLI --tags
npm test

# Check what tags are being used
echo $TAGS  # Linux/Mac
echo %TAGS%  # Windows
```

---

---

## TypeScript Errors

### Error: "Cannot find module or its corresponding type declarations"

**Symptom**:

```
Cannot find module '../../pages/LoginPage.js' or its corresponding type declarations.
```

**Cause**: Import path uses `.js` extension with ESM, but TypeScript expects `.ts`.

**Solution**:

```typescript
// ✅ Correct - use .js extension for ESM
import { LoginPage } from '../../pages/LoginPage.js'

// ❌ Wrong - .ts extension
import { LoginPage } from '../../pages/LoginPage.ts'

// ❌ Wrong - no extension
import { LoginPage } from '../../pages/LoginPage'
```

**Why**: With `"type": "module"`, imports must use `.js` even though files are `.ts`. TypeScript will resolve correctly.

---

### Error: "Argument of type 'Page | undefined' is not assignable"

**Symptom**:

```
Argument of type 'Page | undefined' is not assignable to parameter of type 'Page'.
```

**Solution**:

```typescript
// ❌ TypeScript knows page might be undefined
const loginPage = new LoginPage(this.page)

// ✅ Check first
if (!this.page) {
  throw new Error('Page is not initialized')
}
const loginPage = new LoginPage(this.page)

// ✅ Or use non-null assertion (if you're sure)
const loginPage = new LoginPage(this.page!)

// ✅ Best - use getPageObject helper
const loginPage = this.getPageObject(LoginPage)
```

---

### ESLint Error: "Unsafe assignment of any value"

**Symptom**:

```typescript
// ESLint error: Unsafe assignment of an any value (@typescript-eslint/no-unsafe-assignment)
const loginPage = this.getPageObject(LoginPage)
```

**Cause**: This error doesn't occur in PICKL's default configuration but can appear if you've customized your ESLint settings. PICKL uses `recommendedTypeChecked` from `typescript-eslint`, which does NOT include the stricter `no-unsafe-*` rules. This error typically appears when:

- Using `typescript-eslint`'s **`strict-type-checked`** configuration
- Manually enabling `@typescript-eslint/no-unsafe-assignment` rule
- Your IDE/editor has stricter default ESLint settings

**Why PICKL doesn't have this issue**:

```javascript
// eslint.config.js
...tseslint.configs.recommendedTypeChecked  // ✅ PICKL uses this (lenient)
// NOT using: tseslint.configs.strictTypeChecked  // ❌ Would require explicit types
```

**Solution for strict mode**:

```typescript
// ✅ Explicitly provide the type parameter
const loginPage = this.getPageObject<LoginPage>(LoginPage)
await loginPage.goto()
```

**Why it works**: Explicitly specifying the generic type parameter helps TypeScript's type inference, ensuring the return type is correctly typed as `LoginPage` instead of `any`.

**Alternative - Check your ESLint config**:

```javascript
// If you want to match PICKL's behavior, use recommendedTypeChecked instead of strictTypeChecked
export default [
  ...tseslint.configs.recommendedTypeChecked, // ✅ PICKL's default (no explicit types needed)
  // ...tseslint.configs.strictTypeChecked,   // ❌ Requires explicit types
]
```

Or disable the specific rule:

```javascript
rules: {
  '@typescript-eslint/no-unsafe-assignment': 'off',  // If you prefer PICKL's behavior
}
```

**Configuration comparison**:

| ESLint Config                 | Explicit Type Required? | PICKL Default |
| ----------------------------- | ----------------------- | ------------- |
| `recommendedTypeChecked`      | ❌ No                   | ✅ Yes        |
| `strictTypeChecked`           | ✅ Yes                  | ❌ No         |
| Manual `no-unsafe-assignment` | ✅ Yes                  | ❌ No         |

**Bottom line**: The code works both ways - explicit types are only needed if you're using stricter ESLint rules than PICKL's defaults. Use whichever style matches your project's linting configuration.

---

### ESLint Error: "Unsafe assignment" on process.env variables

**Symptom**:

```typescript
// ESLint error on these lines:
const username = process.env.ADMIN_USERNAME!
const password = process.env.ADMIN_PASSWORD!
```

**Cause**: In strict TypeScript/ESLint mode, `process.env` values are typed as `string | undefined`, and the non-null assertion (`!`) doesn't satisfy the `no-unsafe-assignment` rule.

**Solution - Explicitly type the variables**:

```typescript
// ✅ Option 1: Explicit type annotation
const username: string = process.env.ADMIN_USERNAME!
const password: string = process.env.ADMIN_PASSWORD!

// ✅ Option 2: Type assertion
const username = process.env.ADMIN_USERNAME as string
const password = process.env.ADMIN_PASSWORD as string

// ✅ Option 3: With runtime validation (safest)
const username = process.env.ADMIN_USERNAME
if (!username) {
  throw new Error('ADMIN_USERNAME is not defined')
}
const password = process.env.ADMIN_PASSWORD
if (!password) {
  throw new Error('ADMIN_PASSWORD is not defined')
}
// Now TypeScript knows they're strings
```

**Full example with all fixes**:

```typescript
Given('the admin user login to Orangehrm site', async function () {
  const loginPage = this.getPageObject<LoginPage>(LoginPage)

  // Explicitly type process.env values
  const username: string = process.env.ADMIN_USERNAME!
  const password: string = process.env.ADMIN_PASSWORD!

  await loginPage.goto()
  await loginPage.login(username, password)

  const isLandingDashboardPage = await loginPage.isOnPage('Dashboard')
  expect(isLandingDashboardPage).toBeTruthy()
})
```

---

## Debugging Techniques

### Technique 1: Use Headed Mode

```bash
# See what's happening in the browser
HEADLESS=false npm test
```

---

### Technique 2: Slow Down Execution

```typescript
// In Before hook
const browser = await chromium.launch({
  headless: false,
  slowMo: 1000, // 1 second delay between actions
})
```

---

### Technique 3: Pause Execution

```typescript
// Add to step definition
await page.pause() // Opens Playwright Inspector
```

---

### Technique 4: Take Screenshots

```typescript
// Add to step definition
await page.screenshot({ path: 'debug-screenshot.png', fullPage: true })
```

---

### Technique 5: Use Playwright Inspector

```bash
# Run with inspector
PWDEBUG=1 npm test -- test/features/login.feature
```

---

### Technique 6: Check Trace Files

```bash
# After test failure
ls test-results/traces/

# Upload to trace viewer
# Go to https://trace.playwright.dev/
# Upload the .zip file
```

---

### Technique 7: VS Code Debugger

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test",
      "program": "${workspaceFolder}/node_modules/@cucumber/cucumber/bin/cucumber-js",
      "args": ["${file}", "--require", "test/support/**/*.ts", "--require", "test/steps/**/*.ts"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

Set breakpoints and press F5!

---

### Technique 8: Debug Logging

```typescript
// Use debug logger for strategic logging
import Debug from 'debug'
const debug = Debug('test:steps')

Then('I should see success message', async function () {
  const loginPage = this.getPageObject(LoginPage)
  const page = this.getPage()

  debug('Current URL:', page.url())
  debug('Page title:', await page.title())

  const message = await loginPage.getFlashMessage()
  debug('Flash message:', message)

  expect(message).toContain('success')
})
```

---

## FAQ

### Q: Why do my tests pass locally but fail in CI?

**A**: Common reasons:

1. **Timing differences** - CI is slower. Add appropriate waits.
2. **Environment variables** - Check CI has correct .env values
3. **Browser not installed** - Ensure `npx playwright install` runs in CI
4. **Headless issues** - Some pages behave differently headless vs headed
5. **Screen resolution** - CI may use different viewport size

**Solution**: Test locally with CI-like settings:

```bash
# Use CI environment variables
CI=true npm test

# Use headless mode
HEADLESS=true npm test

# Smaller viewport
# In Before hook
viewport: { width: 1280, height: 720 }
```

---

### Q: How do I debug flaky tests?

**A**: Flaky test debugging steps:

1. **Run test 10+ times**: `for i in {1..10}; do npm test; done`
2. **Enable video recording**: Already enabled in hooks
3. **Add more explicit waits**: Replace implicit waits
4. **Check for race conditions**: Look for missing awaits
5. **Review timing logs**: Add timestamps to debug logs
6. **Use trace viewer**: Check timeline of actions

---

### Q: Can I run a single scenario?

**A**: Yes!

```bash
# By line number
npm test -- test/features/login.feature:15

# By scenario name (partial match)
npm test -- --name "Successful login"

# By tag
npm test -- --tags "@positive"
```

---

### Q: How do I skip a test temporarily?

**A**: Use the `@skip` tag:

```gherkin
@skip
Scenario: Test under development
  Given ...
```

Or run tests excluding it:

```bash
npm test -- --tags "not @skip"
```

---

### Q: Why is my test so slow?

**A**: Common causes:

1. **Unnecessary waits**: Remove `waitForTimeout()`
2. **Not waiting for network idle**: Add `waitForLoadState('networkidle')`
3. **Full-page screenshots**: Use targeted screenshots
4. **Video recording**: Disable for faster local runs
5. **Headed mode**: Headless is faster

**Optimize**:

```typescript
// Remove arbitrary waits
await page.waitForTimeout(3000) // ❌ Slow

// Use specific conditions
await page.waitForSelector('#element') // ✅ Fast
```

---

### Q: How do I test with different data?

**A**: Use Scenario Outline:

```gherkin
Scenario Outline: Login with various users
  When I login with username "<username>" and password "<password>"
  Then I should see "<result>"

  Examples:
    | username | password | result  |
    | tom      | pass123  | success |
    | invalid  | wrong    | error   |
```

---

### Q: Can I run tests in different browsers simultaneously?

**A**: Yes, but requires configuration:

```bash
# Run in different terminals
Terminal 1: npm run test:chromium
Terminal 2: npm run test:firefox
Terminal 3: npm run test:webkit

# Or use parallel execution (advanced)
parallel: 3  # In cucumber.js
```

---

### Q: Where are my test artifacts?

**A**: Check `test-results/` directory:

```
test-results/
├── videos/           # Test execution videos
├── traces/           # Playwright trace files
├── screenshots/      # Failure screenshots
├── html-report/      # HTML test report
└── cucumber-report.json  # Raw test results
```

---

### Q: How do I clear test results?

**A**:

```bash
# Quick clean (test-results only)
npm run clean

# Deep clean (all artifacts and caches)
npm run clean:all

# Or manually
rm -rf test-results

# Then run tests
npm test
```

**What does `clean:all` remove?**

- `test-results/` - Test execution results
- `node_modules/.cache/` - Node modules cache
- `playwright-report/` - Playwright HTML reports
- `.playwright/` - Playwright cache
- `coverage/` - Code coverage reports
- `.nyc_output/` - NYC coverage data
- `downloads/` - Downloaded test files

---

### Q: How do I free up disk space?

**A**:

If your project is taking up too much disk space:

```bash
# Clean all temporary files and caches
npm run clean:all

# This removes all test artifacts, caches, and temporary files
# Safe to run anytime - it won't delete source code or dependencies
```

---

## 📞 Still Stuck?

If you're still experiencing issues:

1. **Check Common Mistakes**: Many errors are caused by common coding mistakes - see [Common Mistakes Guide](COMMON-MISTAKES.md)
2. **Review documentation**:
   - [Architecture](ARCHITECTURE.md) - Understand framework patterns
   - [API Reference](API-REFERENCE.md) - Check correct API usage
   - [Contributing Guide](CONTRIBUTING.md) - Best practices and standards
3. **Check existing issues**: Search the repository issues for similar problems
4. **Ask for help**: Create a new issue with:
   - Error message (full stack trace)
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)
   - What you've already tried

---

## Related Documentation

- [Common Mistakes](COMMON-MISTAKES.md) - **Preventive guide** - Avoid these 28 common mistakes before errors occur
- [Getting Started](GETTING-STARTED.md) - Initial setup and installation guide
- [Running Tests](RUNNING-TESTS.md) - Complete test execution reference
- [Contributing Guide](CONTRIBUTING.md) - Coding standards and best practices
- [Architecture](ARCHITECTURE.md) - Framework internals and patterns
- [API Reference](API-REFERENCE.md) - Detailed API documentation

---

**Remember: The most effective debugging tool is still careful thought... coupled with judiciously placed print statements. 🥒**
