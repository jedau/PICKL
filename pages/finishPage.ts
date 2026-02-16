import { expect, Locator, Page } from '@playwright/test'

export class FinishPage {
  private readonly finishPageHeader: Locator
  private readonly finishPageHeading: Locator
  private readonly finishPageText: Locator

  constructor(public page: Page) {
    this.finishPageHeader = page.locator(
      "//span[@class='title' and @data-test='title' and text()='Checkout: Complete!']",
    )
    this.finishPageHeading = page.getByRole('heading', { name: 'Thank you for your order!' })
    this.finishPageText = page.getByText('Your order has been')
  }

  async verifyUserLandsOnFinishPage() {
    await expect(this.finishPageHeader).toBeVisible()
    await expect(this.finishPageHeader).toHaveText('Checkout: Complete!')
  }

  async verifyFinishPageHeading() {
    await expect(this.finishPageHeading).toBeVisible()
    await expect(this.finishPageHeading).toHaveText('Thank you for your order!')
  }

  async verifyFinishPageText() {
    await expect(this.finishPageText).toBeVisible()
    await expect(this.finishPageText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    )
  }
}
