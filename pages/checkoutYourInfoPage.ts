import { expect, Locator, Page } from '@playwright/test'

export class CheckoutYourInfoPage {
  private readonly firstNameField: Locator
  private readonly lastNameField: Locator
  private readonly postalCodeField: Locator
  private readonly continueButton: Locator
  private readonly cancelButton: Locator
  private readonly checkoutYourHeaderPageHeader: Locator

  constructor(public page: Page) {
    this.checkoutYourHeaderPageHeader = this.page.locator(
      "//span[@class='title' and @data-test='title' and text()='Checkout: Your Information']",
    )
    this.firstNameField = page.locator('[data-test="firstName"]')
    this.lastNameField = page.locator('[data-test="lastName"]')
    this.postalCodeField = page.locator('[data-test="postalCode"]')
    this.continueButton = page.getByRole('button', { name: 'CONTINUE' })
    this.cancelButton = page.getByRole('button', { name: 'CANCEL' })
  }

  async verifyUserLandsOnCheckoutYourInfoPage() {
    await expect(this.checkoutYourHeaderPageHeader).toHaveText('Checkout: Your Information')
  }

  async enterCustomerInformation(firstName: string, lastName: string, postal: string) {
    await this.firstNameField.fill(firstName)
    await this.lastNameField.fill(lastName)
    await this.postalCodeField.fill(postal)
  }

  async inputFirstName(_firstName: string) {
    await this.firstNameField.fill(_firstName)
  }

  async inputLastName(_lastName: string) {
    await this.lastNameField.fill(_lastName)
  }

  async inputPostal(_postal: string) {
    await this.postalCodeField.fill(_postal)
  }

  async clickContinueButton() {
    await this.continueButton.click()
  }

  async clickCancelButton() {
    await this.cancelButton.click()
  }
}
