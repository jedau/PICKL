import { Given, Then, When } from '@cucumber/cucumber'
import { Page } from '@playwright/test'
import { placeOrder } from '../../pages/placeOrder.js'
import { ICustomWorld } from '../support/world.js'

const PRODUCT_BROCOLLI = 'Brocolli - 1 Kg'

// ----> Scenario: Successfully placing an order <---- //

Given('I am on the "Product List" page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  await this.page?.goto('https://rahulshettyacademy.com/seleniumPractise/#/')
  const placeOrderPage = new placeOrder(this.page)
  await placeOrderPage.waitForProducts()
})

When('I click the ADD TO CART button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const placeOrderPage = new placeOrder(this.page)
  await placeOrderPage.addToCartBtn(PRODUCT_BROCOLLI)
})

Then('I should see ✔ ADDED message', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }
  const placeOrderPage = new placeOrder(this.page)
  await placeOrderPage.expectAdded(PRODUCT_BROCOLLI)
})

Then(
  'the Items and Price labels should reflect the added product in the header',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    // Get dynamic product price
    const placeOrderPage = new placeOrder(this.page)
    const { price } = await placeOrderPage.getCartHeaderValues()
    await placeOrderPage.expectItemLabelCount(1, price)
  },
)

When('I click the PROCEED TO CHECKOUT button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const placeOrderPage = new placeOrder(this.page)

  // Open the cart modal first
  await placeOrderPage.openCartModal()

  // Click PROCEED TO CHECKOUT button
  await placeOrderPage.proceedToCheckoutBtn()
})

Then(
  'I should be redirected to the {string} page',
  async function (this: ICustomWorld, pageName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    switch (pageName.toLowerCase()) {
      case 'checkout':
        await this.page.waitForURL('**/#/cart', { timeout: 10000 })
        await this.page.locator('button', { hasText: 'Place Order' }).waitFor({ timeout: 5000 })
        break

      default:
        throw new Error(`Unknown page: ${pageName}`)
    }
  },
)

When('I click the Place Order button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const placeOrderPage = new placeOrder(this.page)

  // Click Place Order button
  await placeOrderPage.placeOrderBtn()
})

Then(
  'I should be navigated to the {string} page',
  async function (this: ICustomWorld, pageName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized')
    }

    switch (pageName.toLowerCase()) {
      case 'country and terms & conditions':
        await this.page.waitForURL('**/#/country', { timeout: 10000 })
        await this.page.locator('button', { hasText: 'Proceed' }).waitFor({ timeout: 5000 })
        break

      default:
        throw new Error(`Unknown page: ${pageName}`)
    }
  },
)

When('I select the country {string}', async function (this: ICustomWorld, countryName: string) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  // Select country in the dropdown
  await this.page.selectOption('select', countryName)
})

Then('I tick the checkbox of Agree to the Terms & Conditions', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  // Locate the checkbox input (you can use the label text or the input selector)
  const checkbox = this.page.locator('input[type="checkbox"]')

  // Tick the checkbox
  await checkbox.check()
})

Then('I click the Proceed button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const placeOrderPage = new placeOrder(this.page)

  // Click the Proceed button
  await placeOrderPage.proceedBtn()
})

Then('I should see the order success message', async function () {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const placeOrderPage = new placeOrder(this.page as Page) // cast to Page
  await placeOrderPage.verifyOrderSuccessMessage()
})
