import { Locator, Page } from '@playwright/test'

export class searchProduct {
  readonly page: Page
  readonly searchbar: Locator
  readonly products: Locator

  constructor(page: Page) {
    this.page = page
    this.searchbar = page.locator('input.search-keyword')
    this.products = page.locator('.products-wrapper .product')
  }

  async searchProd(productName: string): Promise<void> {
    if (!productName.trim()) {
      throw new Error('searchProd called with empty productName')
    }
    await this.searchbar.fill('')
    await this.searchbar.fill(productName)

    // wait for filtering to apply
    await this.page.waitForTimeout(1000)
  }

  getProduct(productName: string): Locator {
    return this.products.filter({ hasText: productName })
  }

  getAllProducts(): Locator {
    return this.products
  }
}
