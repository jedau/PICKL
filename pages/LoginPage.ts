import { expect, Locator, Page } from '@playwright/test'
import { perfVar, usernamesPasswords } from '../constants/contstants.js'

export class LoginPage {
  private readonly userName: Locator
  private readonly password: Locator
  private readonly signInBtn: Locator

  constructor(public page: Page) {
    //this.userName = page.locator('[data-test="username"]')
    this.page = page
    this.userName = page.locator('[data-test="username"]')
    //this.userName = page.getByRole('textbox', { name: 'Username' })
    this.password = page.locator('[data-test="password"]')
    this.signInBtn = page.getByRole('button', { name: 'LOGIN' })
  }

  async goto() {
    await this.page.goto('/')
  }

  //Compound login method
  async loginUser(userName: string, password: string) {
    await this.userName.fill(userName)
    await this.password.fill(password)
    await this.signInBtn.click()
  }

  //Enter Username method
  async inputUsername(userName: string) {
    await this.userName.fill(userName)
  }

  //Enter Password method
  async inputPassword(password: string) {
    await this.password.fill(password)
  }

  //Click Login Button method
  async clickLogInButton() {
    await this.signInBtn.click()
  }

  //Verify if Login is Successfull method
  async verifySuccessfulLogin() {
    await expect(this.page.locator('//*[@id="header_container"]/div[1]/div[2]/div')).toBeVisible()
    await expect(this.page.locator('//*[@id="header_container"]/div[2]/span')).toBeVisible()
    await expect(this.page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText(
      'Products',
    )
  }

  //Verify Error for Mandatory Username method
  async verifyMandatoryUsername() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible()
    await expect(this.page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username is required',
    )
  }

  //Verify Error for Mandatory Password method
  async verifyMandatoryPassword() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible()
    await expect(this.page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Password is required',
    )
  }

  //Verify Error for Locked Out User method
  async verifyLockedOutUser() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible()
    await expect(this.page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    )
  }

  //Verify Login for User with Problem on Inventory Page method
  //Counts Product and will prove that > 0 hence there is a problem
  async verifyProblemUser() {
    const errorProduct = this.page.locator(
      "//div[@class='inventory_item_description' and @data-test='inventory-item-description']//div[@class='inventory_item_desc' and @data-test='inventory-item-desc' and contains(text(), 'carry.allTheThings()')]",
    )
    const errorProductCount = await errorProduct.count()
    expect(errorProductCount).toBeGreaterThan(0)
    // eslint-disable-next-line no-console
    console.log(`\n     Number of Products loadeded in error: ${errorProductCount}`)
  }

  //To Verify Login Performances for Users method
  async verifyLoginPerformancerOfUsers() {
    const usernames = [
      usernamesPasswords.STANDARD_USER,
      usernamesPasswords.PROBLEM_USER,
      usernamesPasswords.PERFORMANCE_GLITCH_USER,
    ]
    //for (let index = 0; index < usernames.length; index++) {
    for (const username of usernames) {
      await this.page.goto('')
      await this.inputUsername(username)
      await this.inputPassword(usernamesPasswords.PASSWORD)
      const startTime = performance.now()
      await this.clickLogInButton()
      await this.verifySuccessfulLogin()
      const endTime = performance.now()
      const loadTime = endTime - startTime
      // eslint-disable-next-line no-console
      console.log(`\n     Page load time of user: ${username} is ${loadTime}ms`)
      expect(loadTime).toBeLessThan(perfVar.EXPECTED_LOGIN_PERFORMANCE)
    }
  }
}
