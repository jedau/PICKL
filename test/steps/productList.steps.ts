import { Then, When } from '@cucumber/cucumber'
import { productList } from '../../pages/productList.js'
import { ICustomWorld } from '../support/world.js'

// ----> Scenario: Clicking [ + ] button to increase the quantity of the product <---- //

When('I click [ + ] button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const productPage = new productList(this.page)
  await productPage.incrementBtn()
})

// ----> Scenario: Clicking [ - ] button to decrease the quantity of the product <---- //

Then('I click [ - ] button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const productPage = new productList(this.page)
  await productPage.decrementBtn()
})

// ----> Scenario: Removing a product in the cart modal <---- //

When('I click on the cart icon', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized')
  }

  const productPage = new productList(this.page)
  await productPage.openCartModal()
})

// When('I click the [ X ] button to remove the product', async function (this: ICustomWorld) {
//   if (!this.page) {
//     throw new Error('Page is not initialized')
//   }

//   const productPage = new productList(this.page)
//   await productPage.removeProduct()
// })
