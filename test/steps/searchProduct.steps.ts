import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { searchProduct } from '../../pages/searchProduct.js'
import { ICustomWorld } from '../support/world.js'

When(
  'I search for {string} in the search bar',
  async function (this: ICustomWorld, productName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    const searchPage = new searchProduct(this.page)
    await searchPage.searchProd(productName)
  },
)

/** Positive Scenario */
Then(
  'results page should show the product {string}',
  async function (this: ICustomWorld, productName: string) {
    const searchPage = new searchProduct(this.page!)
    await expect(searchPage.getProduct(productName)).toBeVisible()
  },
)

/** Negative Scenario */
Then(
  'results page should display "Sorry, no products matched your search!"',
  async function (this: ICustomWorld) {
    const searchPage = new searchProduct(this.page!)
    await expect(searchPage.getAllProducts()).toHaveCount(0)
  },
)
