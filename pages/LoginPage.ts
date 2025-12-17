import { Locator, Page } from '@playwright/test'

/**
 * Page Object Model for the Login page
 * URL: https://the-internet.herokuapp.com/login
 */
export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly flashMessage: Locator
  readonly pageHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('button[type="submit"]')
    this.flashMessage = page.locator('#flash')
    this.pageHeading = page.locator('h2')
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto('/login')
  }

  /**
   * Enter username into the username field
   * @param username - The username to enter
   */
  async enterUsername(username: string) {
    await this.usernameInput.fill(username)
  }

  /**
   * Enter password into the password field
   * @param password - The password to enter
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.loginButton.click()
  }

  /**
   * Perform complete login action
   * @param username - The username to login with
   * @param password - The password to login with
   */
  async login(username: string, password: string) {
    await this.enterUsername(username)
    await this.enterPassword(password)
    await this.clickLogin()
  }

  /**
   * Get the flash message text (success or error)
   * @returns The flash message text without the close button
   */
  async getFlashMessage(): Promise<string> {
    const text = await this.flashMessage.textContent()
    return text?.replace('×', '').trim() ?? ''
  }

  /**
   * Get the current page heading text
   * @returns The page heading text
   */
  async getPageHeading(): Promise<string> {
    return (await this.pageHeading.textContent()) ?? ''
  }

  /**
   * Check if currently on the login page
   * @returns True if on login page, false otherwise
   */
  async isOnLoginPage(): Promise<boolean> {
    const heading = await this.getPageHeading()
    return heading.includes('Login Page')
  }

  /**
   * Check if currently on the secure area page
   * @returns True if on secure area, false otherwise
   */
  async isOnSecureArea(): Promise<boolean> {
    const heading = await this.getPageHeading()
    return heading.includes('Secure Area')
  }
}
