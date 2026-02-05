import { expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage.js'
import { Given, Then, When } from '../support/step-helpers.js'

Given('I am on the login page', async function () {
  const loginPage = this.getPageObject(LoginPage)
  await loginPage.goto()
})

When('I enter username {string}', async function (username: string) {
  const loginPage = this.getPageObject(LoginPage)
  await loginPage.enterUsername(username)
})

When('I enter password {string}', async function (password: string) {
  const loginPage = this.getPageObject(LoginPage)
  await loginPage.enterPassword(password)
})

When('I click the login button', async function () {
  const loginPage = this.getPageObject(LoginPage)
  await loginPage.clickLogin()
})

Then('I should see the secure area page', async function () {
  const loginPage = this.getPageObject(LoginPage)
  const isSecureArea = await loginPage.isOnSecureArea()
  expect(isSecureArea).toBeTruthy()
})

Then('I should see a success message {string}', async function (expectedMessage: string) {
  const loginPage = this.getPageObject(LoginPage)
  const flashMessage = await loginPage.getFlashMessage()
  expect(flashMessage).toContain(expectedMessage)
})

Then('I should see an error message {string}', async function (expectedMessage: string) {
  const loginPage = this.getPageObject(LoginPage)
  const flashMessage = await loginPage.getFlashMessage()
  expect(flashMessage).toContain(expectedMessage)
})

Then('I should remain on the login page', async function () {
  const loginPage = this.getPageObject(LoginPage)
  const isLoginPage = await loginPage.isOnLoginPage()
  expect(isLoginPage).toBeTruthy()
})
