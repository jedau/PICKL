import { Then, When } from '@cucumber/cucumber'
import { cartsVar, persnonalInfo } from '../../constants/contstants.js'
import { CheckoutOverviewPage } from '../../pages/checkoutOverviewPage.js'
import { CheckoutYourInfoPage } from '../../pages/checkoutYourInfoPage.js'
import { FinishPage } from '../../pages/finishPage.js'
import { ProductsPage } from '../../pages/productsPage.js'
import { YourCartPage } from '../../pages/yourCartPage.js'
import { ICustomWorld } from '../support/world.js'

When(
  'I add {string} products to my cart',
  async function (this: ICustomWorld, numberOfProductsVar) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const productsPage = new ProductsPage(this.page)
    const numberOfProduct = cartsVar[numberOfProductsVar as keyof typeof cartsVar]
    await productsPage.addNumberofProducts(numberOfProduct)
  },
)

When('I click on Backpack Add to cart button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const productsPage = new ProductsPage(this.page)
  await productsPage.clickBackPackAddToCartButton()
})

When('I click on Bike Light Add to cart button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const productsPage = new ProductsPage(this.page)
  await productsPage.clickBikeLightAddToCartButton()
})

When('I click on Bolt T-Shirt Add to cart button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const productsPage = new ProductsPage(this.page)
  await productsPage.clickBoltTShirtAddToCartButton()
})

When('I click on Go To Cart Button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const productsPage = new ProductsPage(this.page)
  await productsPage.clickGoToCartButton()
})

Then(
  'I should be able to successfully navigate to Your Cart Page',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const yourCartPage = new YourCartPage(this.page)
    await yourCartPage.verifyUserLandsOnYourCartPage()
  },
)

Then(
  'I should be able to verify number of items on Your Cart Page',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const yourCartPage = new YourCartPage(this.page)
    await yourCartPage.verifyNumberOfItemsInYourCartPage()
  },
)

When('I click on Checkout button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const yourCartPage = new YourCartPage(this.page)
  await yourCartPage.clickCheckoutButton()
})

When(
  'I should be able to nagivate to Checkout Your Information page successfully',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const checkoutYourInfoPage = new CheckoutYourInfoPage(this.page)
    await checkoutYourInfoPage.verifyUserLandsOnCheckoutYourInfoPage()
  },
)

When(
  'I enter {string} First Name on Checkout Your Information page',
  async function (this: ICustomWorld, firstNameVar: string) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const checkoutYourInfoPage = new CheckoutYourInfoPage(this.page)
    const firstName = persnonalInfo[firstNameVar as keyof typeof persnonalInfo]
    await checkoutYourInfoPage.inputFirstName(firstName)
  },
)

When(
  'I enter {string} Last Name on Checkout Your Information page',
  async function (this: ICustomWorld, lastNameVar: string) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const checkoutYourInfoPage = new CheckoutYourInfoPage(this.page)
    const lastName = persnonalInfo[lastNameVar as keyof typeof persnonalInfo]
    await checkoutYourInfoPage.inputLastName(lastName)
  },
)

When(
  'I enter {string} Postal on Checkout Your Information page',
  async function (this: ICustomWorld, postalVar: string) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const checkoutYourInfoPage = new CheckoutYourInfoPage(this.page)
    const postal = persnonalInfo[postalVar as keyof typeof persnonalInfo]
    await checkoutYourInfoPage.inputPostal(postal)
  },
)
When('I click on Continue button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const checkoutYourInfoPage = new CheckoutYourInfoPage(this.page)
  await checkoutYourInfoPage.clickContinueButton()
})

Then(
  'I should be able to navigate to Checkout Overview page successfully',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const checkoutOverviewPage = new CheckoutOverviewPage(this.page)
    await checkoutOverviewPage.verifyUserLandsOnCheckoutYourInfoPage()
  },
)

Then(
  'I should be able to verify correct total amount of products in my cart',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const checkoutOverviewPage = new CheckoutOverviewPage(this.page)
    await checkoutOverviewPage.verifyTotalAmount()
  },
)

When('I click on Finish button', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const checkoutOverviewPage = new CheckoutOverviewPage(this.page)
  await checkoutOverviewPage.clickFinishButton()
})

When(
  'I should be able to navigate to Finish page successfully',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const finishPage = new FinishPage(this.page)
    await finishPage.verifyUserLandsOnFinishPage()
  },
)

When(
  'I should be able to verify heading of the finish page successfully',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const finishPage = new FinishPage(this.page)
    await finishPage.verifyFinishPageHeading()
  },
)

When(
  'I should be able to verify heading text of the finish page successfully',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const finishPage = new FinishPage(this.page)
    await finishPage.verifyFinishPageText()
  },
)

When(
  'I click on Cancel button on Checkout You Information Page',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const checkoutYourInfoPage = new CheckoutYourInfoPage(this.page)
    await checkoutYourInfoPage.clickCancelButton()
  },
)

When('I click on Continue Shopping button on Your Cart Page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialised')
  }

  const yourCartPage = new YourCartPage(this.page)
  await yourCartPage.clickContinueShoppingBUtton()
})

Then(
  'I should be able to navigate to Products page successfully',
  async function (this: ICustomWorld) {
    if (!this.page) {
      throw new Error('Page not initialised')
    }

    const productsPage = new ProductsPage(this.page)
    await productsPage.verifyUserLandsOnProductsPage()
  },
)

// Then('I can verify Backpack Image successfully', async function (this: ICustomWorld) {
//   if (!this.page) {
//     throw new Error('Page not initialised')
//   }

//   const productsPage = new ProductsPage(this.page)
//   await productsPage.backPackImgCompare()
// })
