import { Locator, Page, expect } from '@playwright/test'

export class placeOrder {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Returns the ADD TO CART button for a given product
   */
  addToCartButton(productName: string): Locator {
    return this.page.locator('.product', { hasText: productName }).locator('button')
  }

  /**
   * Click ADD TO CART button
   */
  async addToCartBtn(productName = 'Brocolli - 1 Kg') {
    const button = this.addToCartButton(productName)
    await button.click()
  }

  /**
   * Button text should change to ADDED
   */
  async expectAdded(productName = 'Brocolli - 1 Kg') {
    const button = this.addToCartButton(productName)
    await expect(button).toHaveText('✔ ADDED', { timeout: 20000 })
  }

  /**
   * Wait for products to load
   */
  async waitForProducts() {
    await this.page.locator('.products-wrapper .product').first().waitFor({ state: 'visible' })
  }

  /**
   * Get item count and price from cart header
   */
  async getCartHeaderValues(): Promise<{ items: number; price: number }> {
    const labelText = await this.page.locator('.cart-info').innerText()

    const itemsMatch = /Items\s*:\s*(\d+)/.exec(labelText)
    const priceMatch = /Price\s*:\s*(\d+)/.exec(labelText)

    if (!itemsMatch || !priceMatch) {
      throw new Error(`Could not parse cart header: ${labelText}`)
    }

    return {
      items: Number(itemsMatch[1]),
      price: Number(priceMatch[1]),
    }
  }

  /**
   * Assert item count and price in header
   */
  async expectItemLabelCount(expectedCount: number, expectedPrice: number) {
    const { items, price } = await this.getCartHeaderValues()

    expect(items).toBe(expectedCount)
    expect(price).toBe(expectedPrice)
  }

  /**
   * Click cart icon to open cart modal
   */
  async openCartModal() {
    const cartIcon = this.page.locator('.cart-icon')
    await cartIcon.click()
  }

  /**
   * Click PROCEED TO CHECKOUT button from cart modal
   */
  async proceedToCheckoutBtn() {
    const cartModal = this.page.locator('.cart-preview')
    await cartModal.waitFor({ state: 'visible', timeout: 5000 })

    // Locate the "PROCEED TO CHECKOUT" button inside the modal
    const checkoutButton = cartModal.locator('button', { hasText: 'PROCEED TO CHECKOUT' })
    await Promise.all([this.page.waitForURL('**/#/cart'), checkoutButton.click()])
  }

  /**
   * Click Place Order button
   */
  async placeOrderBtn() {
    const placeOrderButton = this.page.locator('button', { hasText: 'Place Order' })
    await placeOrderButton.click()
  }

  /**
   * Click PROCEED button from "Country and Terms & Conditions" page
   */
  async proceedBtn() {
    const proceedButton = this.page.locator('button', { hasText: 'Proceed' })
    await proceedButton.click()
  }

  /**
   * Verify the order success message
   */
  async verifyOrderSuccessMessage() {
    const messageContainer = this.page.locator('.wrapperTwo')
    await messageContainer.waitFor({ state: 'visible', timeout: 5000 })
    const messageText = await messageContainer.innerText()

    expect(messageText).toContain('Thank you, your order has been placed successfully')
    expect(messageText).toContain("You'll be redirected to Home page shortly!!")
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
   * Click [ - ] button to increase the quantity
   */
  async decrementBtn() {
    const broccoliProduct = this.page.locator('.product', { hasText: 'Brocolli - 1 Kg' })
    const decreaseButton = broccoliProduct.locator('.decrement')
    await decreaseButton.click()
  }
}
