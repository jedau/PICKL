import { Page } from '@playwright/test'
import { placeOrder } from './placeOrder.js'

export class productList {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Click [ + ] button to increase the quantity
   */
  async incrementBtn() {
    const broccoliProduct = this.page.locator('.product', { hasText: 'Brocolli - 1 Kg' })
    const increaseButton = broccoliProduct.locator('.increment')
    await increaseButton.click()
  }

  /**
   * Click [ - ] button to decrease the quantity
   */
  async decrementBtn() {
    const broccoliProduct = this.page.locator('.product', { hasText: 'Brocolli - 1 Kg' })
    const decreaseButton = broccoliProduct.locator('.decrement')
    await decreaseButton.click()
  }

  /**
   * Click cart icon to open cart modal
   */
  async openCartModal() {
    const orderPage = new placeOrder(this.page)
    await orderPage.openCartModal()
  }
}
