# PICKL Training Exercises 🥒

Welcome to the PICKL training program! These exercises are designed to help you master BDD test automation with Playwright and Cucumber through hands-on practice.

## Table of Contents

- [Getting Started](#getting-started)
- [Week 1: Foundation](#week-1-foundation)
- [Week 2: Intermediate](#week-2-intermediate)
- [Week 3: Advanced](#week-3-advanced)
- [Week 4: Master Level](#week-4-master-level)
- [Challenge Projects](#challenge-projects)
- [Solutions & Hints](#solutions--hints)

---

## Getting Started

### Prerequisites

Before starting the exercises, ensure you have:

- ✅ Completed the [Getting Started Guide](GETTING-STARTED.md)
- ✅ Read the [Architecture Documentation](ARCHITECTURE.md)
- ✅ Familiarized yourself with [Writing Tests](WRITING-TESTS.md)
- ✅ Successfully run existing tests with `npm test`

### Learning Approach

1. **Read** the exercise description carefully
2. **Plan** your solution before coding
3. **Implement** the solution
4. **Test** your implementation
5. **Review** the hints/solutions if stuck
6. **Refactor** your code for best practices

---

## Week 1: Foundation

### Exercise 1.1: Run and Understand Existing Tests

**Objective**: Familiarize yourself with the existing test suite.

**Tasks**:

1. Run all tests: `npm test`
2. Run only smoke tests: `npm run test:smoke`
3. Run only login feature: `npm test -- test/features/login.feature`
4. Run tests in Firefox: `npm run test:firefox`
5. Generate and view HTML report: `npm run report`

**Questions to Answer**:

- How many scenarios pass? How many are skipped?
- What does the verbose formatter display during execution?
- Where are test artifacts saved?
- What information is in the HTML report?

**Deliverable**: Document your observations in a text file.

---

### Exercise 1.2: Modify an Existing Scenario

**Objective**: Learn to modify feature files and understand step definitions.

**Tasks**:

1. Open `test/features/login.feature`
2. Add a new scenario called "Login with empty username only":
   ```gherkin
   @negative
   Scenario: Login with empty username only
     When I enter password "SuperSecretPassword!"
     And I click the login button
     Then I should see an error message "Your username is invalid!"
     And I should remain on the login page
   ```
3. Run the test to verify it works
4. Tag it with `@smoke` and verify it runs with smoke tests

**Deliverable**: Modified `login.feature` file with passing test.

**Hint**: You don't need to create new step definitions; they already exist!

---

### Exercise 1.3: Create Your First Page Object

**Objective**: Learn to create a basic page object model.

**Tasks**:

1. Visit https://the-internet.herokuapp.com/dropdown
2. Identify the page elements:
   - Page heading
   - Dropdown menu (id: `dropdown`)
   - Options in the dropdown
3. Create `pages/DropdownPage.ts` with:
   - Constructor accepting `Page`
   - Locators for heading and dropdown
   - `goto()` method
   - `selectOption(value: string)` method
   - `getSelectedOption()` method returning `Promise<string>`
4. Add JSDoc comments to all methods

**Deliverable**: `DropdownPage.ts` file.

**Hint**: Look at `LoginPage.ts` as a reference.

<details>
<summary>📝 Template</summary>

```typescript
import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for the Dropdown page
 * URL: https://the-internet.herokuapp.com/dropdown
 */
export class DropdownPage {
  readonly page: Page
  // TODO: Add locators

  constructor(page: Page) {
    // TODO: Initialize page and locators
  }

  /**
   * Navigate to the dropdown page
   */
  async goto() {
    // TODO: Implement navigation
  }

  // TODO: Add other methods
}
```

</details>

---

### Exercise 1.4: Write Your First Feature File

**Objective**: Practice writing Gherkin scenarios.

**Tasks**:

1. Create `test/features/dropdown.feature`
2. Write a feature with:
   - Feature description (As a... I want... So that...)
   - Background step to navigate to dropdown page
   - 3 scenarios:
     - Verify default selection (should be "Please select an option")
     - Select Option 1
     - Select Option 2
3. Tag scenarios appropriately (@smoke, @positive)

**Deliverable**: `dropdown.feature` file.

**Hint**: Follow the structure of existing feature files.

<details>
<summary>📝 Template</summary>

```gherkin
@smoke
Feature: Dropdown Selection
  As a user
  I want to select options from a dropdown
  So that I can choose from available options

  Background:
    # TODO: Add background step

  @positive
  Scenario: Verify default dropdown selection
    # TODO: Add steps

  # TODO: Add more scenarios
```

</details>

---

### Exercise 1.5: Implement Step Definitions

**Objective**: Connect Gherkin steps to Page Objects.

**Tasks**:

1. Create `test/steps/dropdown.steps.ts`
2. Implement step definitions for:
   - `Given I am on the dropdown page`
   - `When I select option {string} from the dropdown`
   - `Then the selected option should be {string}`
3. Use the `DropdownPage` you created
4. Add proper TypeScript typing with `ICustomWorld`
5. Run the tests and verify they pass

**Deliverable**: `dropdown.steps.ts` with passing tests.

**Hint**: Check `login.steps.ts` for the pattern.

<details>
<summary>📝 Template</summary>

```typescript
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ICustomWorld } from '../support/world.js'
import { DropdownPage } from '../../pages/DropdownPage.js'

Given('I am on the dropdown page', async function (this: ICustomWorld) {
  // TODO: Implement
})

// TODO: Add more step definitions
```

</details>

---

## Week 2: Intermediate

### Exercise 2.1: Add Form Page with Multiple Input Types

**Objective**: Handle various form input types.

**Tasks**:

1. Visit https://the-internet.herokuapp.com/inputs
2. Create `pages/InputsPage.ts` with methods to:
   - Navigate to the page
   - Enter a number in the input field
   - Get the current input value
   - Clear the input field
3. Create `test/features/inputs.feature` with scenarios for:
   - Enter a positive number
   - Enter a negative number
   - Enter a decimal number
   - Clear input field
4. Create step definitions in `test/steps/inputs.steps.ts`
5. Run and verify all tests pass

**Deliverable**: Complete page object, feature file, and step definitions.

---

### Exercise 2.2: Working with Dynamic Content

**Objective**: Handle dynamic page elements.

**Tasks**:

1. Visit https://the-internet.herokuapp.com/dynamic_content
2. Create `pages/DynamicContentPage.ts` that can:
   - Navigate to the page
   - Click "click here" to refresh content
   - Get all text content from the page
   - Count the number of content rows
3. Create a scenario that:
   - Captures content before refresh
   - Clicks refresh
   - Captures content after refresh
   - Verifies that content has changed
4. Implement the step definitions

**Challenge**: How do you verify that dynamic content actually changed?

**Deliverable**: Working test that verifies dynamic content refresh.

---

### Exercise 2.3: File Upload Functionality

**Objective**: Learn to handle file uploads.

**Tasks**:

1. Visit https://the-internet.herokuapp.com/upload
2. Create a test file in `test/fixtures/test-file.txt`
3. Create `pages/FileUploadPage.ts` with methods to:
   - Navigate to the page
   - Upload a file
   - Get uploaded file name confirmation
4. Create a scenario that:
   - Uploads a file
   - Verifies the upload was successful
5. Implement step definitions

**Deliverable**: Working file upload test.

**Hint**: Use Playwright's `setInputFiles()` method.

---

### Exercise 2.4: Create a Reusable Step Helper

**Objective**: Reduce code duplication in step definitions.

**Tasks**:

1. Create `test/support/step-helpers.ts`
2. Implement utility functions:
   ```typescript
   export function getPage(world: ICustomWorld): Page
   export function ensurePageInitialized(world: ICustomWorld): void
   ```
3. Refactor ALL existing step definitions to use these helpers
4. Run tests to ensure nothing broke

**Deliverable**: Refactored step definitions using helper functions.

**Hint**: Look at how many times you check `if (!this.page)`!

---

### Exercise 2.5: Scenario Outline with Data Tables

**Objective**: Master parameterized tests.

**Tasks**:

1. In `test/features/login.feature`, add a Scenario Outline:

   ```gherkin
   @regression
   Scenario Outline: Login with various invalid credentials
     When I enter username "<username>"
     And I enter password "<password>"
     And I click the login button
     Then I should see an error message "<error>"

     Examples:
       | username    | password              | error                        |
       | invalid     | SuperSecretPassword!  | Your username is invalid!    |
       | tomsmith    | wrongpassword         | Your password is invalid!    |
       |             |                       | Your username is invalid!    |
   ```

2. Run the tests and verify all examples execute
3. Add 2 more examples to the table

**Deliverable**: Working scenario outline with at least 5 examples.

---

## Week 3: Advanced

### Exercise 3.1: Custom Helper Utilities

**Objective**: Create reusable wait utilities.

**Tasks**:

1. Create `test/utils/wait.ts`
2. Implement functions:
   ```typescript
   export async function waitForNetworkIdle(page: Page, timeout?: number): Promise<void>
   export async function waitForElementToDisappear(page: Page, selector: string): Promise<void>
   export async function waitForText(locator: Locator, text: string): Promise<void>
   ```
3. Use these utilities in at least 2 different step definitions
4. Document when each utility should be used

**Deliverable**: `wait.ts` utility file with working implementations.

---

### Exercise 3.2: Test Data Management System

**Objective**: Centralize test data for reusability.

**Tasks**:

1. Create `test/fixtures/testData.ts`
2. Define test data structure:
   ```typescript
   export const TEST_USERS = {
     valid: { username: 'tomsmith', password: 'SuperSecretPassword!' },
     invalidUsername: { username: 'invalid', password: 'SuperSecretPassword!' },
     invalidPassword: { username: 'tomsmith', password: 'wrong' },
   }
   ```
3. Refactor login step definitions to use this test data
4. Add test data for dropdown and checkbox tests

**Deliverable**: Centralized test data file used across multiple tests.

---

### Exercise 3.3: Custom Error Handling

**Objective**: Create custom error classes for better debugging.

**Tasks**:

1. Create `test/utils/errors.ts`
2. Implement custom error classes:
   ```typescript
   export class PageNotInitializedError extends Error
   export class ElementNotFoundError extends Error
   export class TestDataMissingError extends Error
   ```
3. Use these in step definitions and page objects
4. Add helpful error messages with debugging info

**Deliverable**: Custom error classes used in tests.

---

### Exercise 3.4: Base Page Class

**Objective**: Create a base class for common page functionality.

**Tasks**:

1. Create `pages/BasePage.ts`
2. Implement common methods:

   ```typescript
   abstract class BasePage {
     protected page: Page

     async waitForPageLoad(): Promise<void>
     async takeScreenshot(name: string): Promise<Buffer>
     async scrollToElement(locator: Locator): Promise<void>
     async isElementVisible(locator: Locator): Promise<boolean>
   }
   ```

3. Refactor at least 2 existing page objects to extend `BasePage`
4. Use the base class methods in your page objects

**Deliverable**: Base page class with at least 2 page objects using it.

---

### Exercise 3.5: API Integration Test

**Objective**: Combine UI and API testing.

**Tasks**:

1. Create `test/utils/api.ts` for API calls
2. Create a test that:
   - Makes an API call to create test data
   - Uses that data in a UI test
   - Cleans up via API after the test
3. Store API endpoints in `test/constants/endpoints.ts`

**Challenge**: How do you share data between API setup and UI steps?

**Deliverable**: Working test combining API and UI automation.

**Hint**: Store created data in the Custom World!

---

## Week 4: Master Level

### Exercise 4.1: Custom Formatter Enhancement

**Objective**: Extend the verbose formatter with new features.

**Tasks**:

1. Copy `test/support/verbose-formatter.ts` to `test/support/enhanced-formatter.ts`
2. Add these features:
   - Color-coded output (red for failures, green for success)
   - Test duration per scenario
   - Failure rate percentage
   - Top 3 slowest steps
3. Configure cucumber.js to use your formatter
4. Run tests and verify enhanced output

**Deliverable**: Enhanced formatter with new features.

---

### Exercise 4.2: Parallel Execution Setup

**Objective**: Configure and test parallel execution.

**Tasks**:

1. Research Cucumber parallel execution
2. Modify `cucumber.js` to support parallel workers
3. Ensure test isolation (no shared state issues)
4. Run tests in parallel and compare execution time
5. Document findings and limitations

**Deliverable**: Working parallel test configuration with documentation.

**Challenge**: Some tests may fail in parallel. Can you fix them?

---

### Exercise 4.3: CI/CD Pipeline Configuration

**Objective**: Set up automated testing in CI/CD.

**Tasks**:

1. Create `.github/workflows/test.yml`
2. Configure workflow to:
   - Run on pull requests
   - Install dependencies
   - Run tests
   - Generate report
   - Upload artifacts (screenshots, videos, reports)
3. Add status badge to README.md
4. Test the workflow with a pull request

**Deliverable**: Working GitHub Actions workflow.

---

### Exercise 4.4: Docker Containerization

**Objective**: Run tests in Docker containers.

**Tasks**:

1. Create `Dockerfile` for the project
2. Create `docker-compose.yml` for easy execution
3. Ensure all tests pass in the container
4. Add docker commands to README.md
5. Document any differences between local and Docker execution

**Deliverable**: Dockerized test execution.

---

### Exercise 4.5: Performance Testing Integration

**Objective**: Add basic performance metrics to tests.

**Tasks**:

1. Create `test/utils/performance.ts`
2. Implement functions to:
   - Measure page load time
   - Measure action duration
   - Log performance metrics
3. Add performance assertions to existing tests:
   - Login should complete in < 5 seconds
   - Page load should complete in < 3 seconds
4. Generate performance report

**Deliverable**: Tests with performance metrics.

---

## Challenge Projects

### Challenge 1: E-commerce Test Suite

**Objective**: Create a comprehensive test suite for an e-commerce site.

**Requirements**:

- Test product search
- Test add to cart functionality
- Test checkout process (multiple steps)
- Test user account management
- Use Page Object Model throughout
- Include positive and negative scenarios
- Generate comprehensive report

**Time Estimate**: 8-10 hours

---

### Challenge 2: API Testing Framework

**Objective**: Build a complete API testing framework using Cucumber.

**Requirements**:

- Test REST API endpoints
- Include authentication tests
- Test CRUD operations
- Schema validation
- Response time assertions
- Integration with existing UI tests

**Time Estimate**: 6-8 hours

---

### Challenge 3: Visual Regression Testing

**Objective**: Implement visual regression testing.

**Requirements**:

- Capture screenshots of key pages
- Compare with baseline images
- Highlight differences
- Integration with existing test suite
- Report visual differences

**Time Estimate**: 4-6 hours

---

## Solutions & Hints

### Exercise 1.3 Hints

<details>
<summary>Click to reveal</summary>

```typescript
// Key locators
this.dropdown = page.locator('#dropdown')

// Select option
await this.dropdown.selectOption(value)

// Get selected value
const selected = await this.dropdown.inputValue()
```

</details>

---

### Exercise 1.4 Hints

<details>
<summary>Click to reveal</summary>

```gherkin
Background:
  Given I am on the dropdown page

Scenario: Select Option 1
  When I select option "1" from the dropdown
  Then the selected option should be "1"
```

</details>

---

### Exercise 2.2 Hints

<details>
<summary>Click to reveal</summary>

```typescript
// Store initial content
const contentBefore = await page.locator('.row').allTextContents()

// Refresh
await page.locator('a[href*="click"]').click()

// Get new content
const contentAfter = await page.locator('.row').allTextContents()

// Compare (they should be different)
expect(contentBefore).not.toEqual(contentAfter)
```

</details>

---

### Exercise 2.4 Solution

<details>
<summary>Click to reveal</summary>

```typescript
// test/support/step-helpers.ts
import { Page } from '@playwright/test'
import { ICustomWorld } from './world.js'

export function getPage(world: ICustomWorld): Page {
  if (!world.page) {
    throw new Error('Page is not initialized. Ensure Before hook has run.')
  }
  return world.page
}

// Usage in step definitions
import { getPage } from '../support/step-helpers.js'

Given('I am on the login page', async function (this: ICustomWorld) {
  const page = getPage(this)
  const loginPage = new LoginPage(page)
  await loginPage.goto()
})
```

</details>

---

### Exercise 3.5 Hints

<details>
<summary>Click to reveal</summary>

```typescript
// Extend CustomWorld
export interface ICustomWorld extends World {
  page?: Page
  context?: BrowserContext
  testData?: Record<string, any> // Add this
}

// In API step
When('I create a test user via API', async function (this: ICustomWorld) {
  const user = await createUserViaAPI()
  this.testData = { user } // Store for later use
})

// In UI step
When('I login with the created user', async function (this: ICustomWorld) {
  const { user } = this.testData!
  // Use the user data
})
```

</details>

---

## Additional Resources

- [Cucumber Best Practices](https://cucumber.io/docs/bdd/better-gherkin/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

**Remember: The goal is to learn, not to rush. Take your time with each exercise!** 🥒
