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
    const broccoliProduct = this.page.locator('.product', { hasText: 'Brocolli - 1 Kg' }) // Locate the product container for Broccoli
    const increaseButton = broccoliProduct.locator('.increment') // Locate the "+" button inside that container
    await increaseButton.click() // Click the "+" button
  }

  /**
   * Click [ - ] button to decrease the quantity
   */
  async decrementBtn() {
    const broccoliProduct = this.page.locator('.product', { hasText: 'Brocolli - 1 Kg' }) // Locate the product container for Broccoli
    const decreaseButton = broccoliProduct.locator('.decrement') // Locate the "-" button inside that container
    await decreaseButton.click() // Click the "-" button
  }

  /**
   * Click cart icon to open cart modal using placeOrder method
   */
  async openCartModal() {
    const orderPage = new placeOrder(this.page) // Create an instance of placeOrder
    await orderPage.openCartModal() // Use the openCartModal method from placeOrder to open the cart
  }
}
