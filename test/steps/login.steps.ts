import { Given, Then, When } from '@cucumber/cucumber'
import { usernamesPasswords } from '../../constants/contstants.js'
import { LoginPage } from '../../pages/loginPage.js'
import { ICustomWorld } from '../support/world.js'

Given('I am on the login page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.goto()
})

When(
  'I login to the system',
  async function (this: ICustomWorld, userNameVar: string, passwordVar: string) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const loginPage = new LoginPage(this.page)

    const userName = usernamesPasswords[userNameVar as keyof typeof usernamesPasswords]
    const password = usernamesPasswords[passwordVar as keyof typeof usernamesPasswords]
    await loginPage.inputUsername(userName)
    await loginPage.inputPassword(password)
  },
)

When('I enter username {string}', async function (this: ICustomWorld, userNameVar: string) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const loginPage = new LoginPage(this.page)

  const userName = usernamesPasswords[userNameVar as keyof typeof usernamesPasswords]
  await loginPage.inputUsername(userName)
})

When('I enter password {string}', async function (this: ICustomWorld, passwordVar: string) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const loginPage = new LoginPage(this.page)
  const password = usernamesPasswords[passwordVar as keyof typeof usernamesPasswords]
  await loginPage.inputPassword(password)
})

When('I click on Login button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.clickLogInButton()
})

Then('I should be able to login successfully', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.verifySuccessfulLogin()
})

Then('I should encounter a mandatory username error', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.verifyMandatoryUsername()
})

Then('I should encounter a mandatory pasword error', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.verifyMandatoryPassword()
})

Then('I should encounter a lockedout user error', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.verifyLockedOutUser()
})

Then('I should be able to verify performance of the users', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const loginPage = new LoginPage(this.page)
  await loginPage.verifyLoginPerformancerOfUsers()
})

Then(
  'I should be able to verify problem user login of the users',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const loginPage = new LoginPage(this.page)
    await loginPage.verifyProblemUser()
  },
)
