import { expect, Locator, Page } from '@playwright/test'

export class ProductsPage {
  private readonly productsPageHeader: Locator
  private readonly addToCartButtons: Locator
  private readonly backpackAddtoCart: Locator
  private readonly bikelightAddtoCart: Locator
  private readonly boltTShirtAdddtoCart: Locator
  private readonly goToCartButton: Locator
  private readonly backPackImg: Locator

  constructor(public page: Page) {
    this.productsPageHeader = page.locator(
      "//span[@class='title' and @data-test='title' and text()='Products']",
    )
    this.addToCartButtons = page.locator(
      "//button[contains(@class, 'btn_primary') and contains(@class, 'btn_small') and contains(@class, 'btn_inventory')]",
    )

    this.backpackAddtoCart = page.locator('//*[@id="add-to-cart-sauce-labs-backpack"]')
    this.bikelightAddtoCart = page.locator('//*[@id="add-to-cart-sauce-labs-bike-light"]')
    this.boltTShirtAdddtoCart = page.locator('//*[@id="add-to-cart-sauce-labs-bolt-t-shirt"]')
    this.goToCartButton = page.locator('#shopping_cart_container')
    this.backPackImg = page.locator('//*[@id="item_4_img_link"]/img')
  }

  async addNumberofProducts(numberOfProducts: number) {
    const addToCartButtons = await this.addToCartButtons.elementHandles()

    for (const button of addToCartButtons.slice(0, numberOfProducts)) {
      await button.click()
    }

    // eslint-disable-next-line no-console
    console.log(`\n    Number of Products Added: ${numberOfProducts}`)
  }

  async clickBackPackAddToCartButton() {
    await this.backpackAddtoCart.click()
  }

  async clickBikeLightAddToCartButton() {
    await this.bikelightAddtoCart.click()
  }

  async clickBoltTShirtAddToCartButton() {
    await this.boltTShirtAdddtoCart.click()
  }

  async clickGoToCartButton() {
    await this.goToCartButton.click()
  }

  async verifyUserLandsOnProductsPage() {
    await expect(this.productsPageHeader).toHaveText('Products')
  }

  // async backPackImgCompare() {
  //   const expected = './expectedImages/backpack.png'
  //   const options = { locator: this.backPackImg, timeout: 0 }
  //   let result: { actual?: Buffer; diff?: Buffer; errorMessage?: string; diffPixelRatio: number }

  //   if (fs.existsSync(expected)) {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  //     result = await this.page._expectScreenshot({
  //       ...options,
  //       expected: fs.readFileSync(expected),
  //     })
  //   } else {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  //     result = await this.page._expectScreenshot(options)
  //     fs.outputFileSync(expected, result.actual)
  //   }
  //   expect(result?.errorMessage ?? '').not.toContain('different')
  // }
}
