import { expect, Locator, Page } from '@playwright/test'
import { cartsVar } from '../constants/contstants.js'

export class YourCartPage {
  private readonly inventoryItem: Locator
  private readonly checkoutButton: Locator
  private readonly yourCartHeader: Locator
  private readonly continueShoppingButton: Locator

  constructor(public page: Page) {
    this.yourCartHeader = page.locator(
      "//span[@class='title' and @data-test='title' and text()='Your Cart']",
    )
    this.inventoryItem = page.locator("//div[@class='inventory_item_name']")
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
  }

  async verifyUserLandsOnYourCartPage() {
    await expect(this.yourCartHeader).toHaveText('Your Cart')
  }

  async verifyNumberOfItemsInYourCartPage() {
    const numberOfInventoryItem = await this.inventoryItem.count()
    expect(numberOfInventoryItem).toEqual(cartsVar.NUMBER_OF_ITEMS_TO_ADD)
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click()
  }

  async clickContinueShoppingBUtton() {
    await this.continueShoppingButton.click()
  }
}
