import { expect, Locator, Page } from '@playwright/test'

export class CheckoutOverviewPage {
  private readonly finishButton: Locator
  private readonly cancelButton: Locator
  private readonly checkoutOverviewPageHeader: Locator
  private readonly itemsPricesLabels: Locator
  private readonly itemTotalLabel: Locator

  constructor(public page: Page) {
    this.checkoutOverviewPageHeader = this.page.locator(
      "//span[@class='title' and @data-test='title']",
    )
    this.finishButton = page.getByRole('button', { name: 'FINISH' })
    this.cancelButton = page.getByRole('button', { name: 'CANCEL' })
    this.itemsPricesLabels = page.locator("[data-test='inventory-item-price']")
    this.itemTotalLabel = page.getByText('Item total: $')
  }

  async verifyUserLandsOnCheckoutYourInfoPage() {
    await expect(this.checkoutOverviewPageHeader).toBeVisible()
  }

  async clickFinishButton() {
    await this.finishButton.click()
  }

  async clickCancelButton() {
    await this.cancelButton.click()
  }

  async verifyTotalAmount(): Promise<void> {
    const pricesCount = await this.itemsPricesLabels.count()

    let totalPrice = 0

    for (let i = 0; i < pricesCount; i++) {
      const pricesTexts = await this.itemsPricesLabels.nth(i).innerText()
      const itemsPrice = parseFloat(pricesTexts.replace('$', ''))
      totalPrice += itemsPrice
    }

    const expectedTotalPrice = totalPrice.toFixed(2)
    const itemTotalString = await this.itemTotalLabel.innerText()
    const itemTotalInt = parseFloat(itemTotalString.replace('Item total: $', ''))
    const actualItemTotal = itemTotalInt.toFixed(2)

    // eslint-disable-next-line no-console
    console.log(`\n     Expected Items Total: $${expectedTotalPrice}`)

    // eslint-disable-next-line no-console
    console.log(`     Actual Items Total: $${actualItemTotal}`)
    expect(expectedTotalPrice).toEqual(actualItemTotal)
  }
}
