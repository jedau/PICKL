import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber'
import { BrowserContext, Page } from '@playwright/test'

/**
 * Custom World interface that extends Cucumber's base World.
 * Provides typed access to Playwright browser instances and context.
 */
export interface ICustomWorld extends World {
  /** Playwright Page instance for browser automation */
  page?: Page
  /** Playwright BrowserContext for managing browser state and cookies */
  context?: BrowserContext
  /** Get the Playwright Page instance with validation */
  getPage(): Page
  /** Get a page object instance with automatic page injection */
  getPageObject<T>(PageClass: new (page: Page) => T): T
}

/**
 * Custom World class for Cucumber scenarios.
 * Each scenario gets a fresh instance of this class, ensuring test isolation.
 * The World holds shared state (page, context) that's accessible across all step definitions.
 */
export class CustomWorld extends World implements ICustomWorld {
  /** Playwright Page instance for browser automation */
  page?: Page
  /** Playwright BrowserContext for managing browser state and cookies */
  context?: BrowserContext

  /**
   * Creates a new CustomWorld instance for a Cucumber scenario.
   * @param options - World options provided by Cucumber, including parameters from cucumber.js
   */
  constructor(options: IWorldOptions) {
    super(options)
  }

  /**
   * Gets the Playwright Page instance with validation.
   * Throws an error if the page is not initialized.
   *
   * @returns The Playwright Page instance
   * @throws {Error} When the page is not initialized
   *
   * @example
   * ```typescript
   * When('I wait for {int} milliseconds', async function (ms: number) {
   *   const page = this.getPage()
   *   await page.waitForTimeout(ms)
   * })
   * ```
   */
  getPage(): Page {
    if (!this.page) {
      throw new Error('Page is not initialized. Ensure the browser is launched in Before hook.')
    }
    return this.page
  }

  /**
   * Gets a page object instance with the page automatically retrieved and injected.
   * This method eliminates the need to pass `this` as a parameter.
   *
   * @param PageClass - The page object class constructor
   * @returns An instance of the page object
   * @throws {Error} When the page is not initialized
   *
   * @example
   * ```typescript
   * Given('I am on the login page', async function () {
   *   const loginPage = this.getPageObject(LoginPage)
   *   await loginPage.goto()
   * })
   * ```
   */
  getPageObject<T>(PageClass: new (page: Page) => T): T {
    const page = this.getPage()
    return new PageClass(page)
  }
}

/**
 * Register CustomWorld as the World constructor for Cucumber.
 *
 * This follows the standard Cucumber pattern of calling setWorldConstructor() at module load time.
 * Cucumber imports this file once during test execution as configured in cucumber.js.
 *
 * IMPORTANT: Do not import this file directly in test files. Use the ICustomWorld interface
 * for typing instead. The global flag ensures registration happens only once, even if this
 * module is loaded multiple times through different import paths.
 */
declare global {
  var _cucumberCustomWorldRegistered: boolean | undefined
}

if (!globalThis._cucumberCustomWorldRegistered) {
  setWorldConstructor(CustomWorld)
  globalThis._cucumberCustomWorldRegistered = true
}
