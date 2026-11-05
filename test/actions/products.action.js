import appHelper from '../helpers/app.helper.js';
import productsPage from '../pageobjects/products.page.js';

export class ProductsAction {
  async waitForProducts() {
    return appHelper.waitForElement(productsPage.productsTitle);
  }

  async sortPricesLowToHigh() {
    const sortButton = await appHelper.waitForElement(productsPage.sortButton);
    await sortButton.click();

    const option = await appHelper.waitForElement(productsPage.priceLowToHighOption);
    await option.click();
    await driver.back();

    const sortDialogTitle = await $(productsPage.sortDialogTitle);
    await sortDialogTitle.waitForDisplayed({ reverse: true, timeout: 5000 });
  }

  async getProductPrices() {
    const priceElements = await $$(productsPage.productPrices);
    const prices = [];

    for (const priceElement of priceElements) {
      const priceText = await priceElement.getText();
      const price = Number(priceText.replace(/[$,]/g, ''));

      if (!Number.isFinite(price)) {
        throw new Error(`Could not parse product price: "${priceText}"`);
      }

      prices.push(price);
    }

    return prices;
  }

  async logout() {
    const menuButton = await appHelper.waitForElement(productsPage.menuButton);
    await menuButton.click();

    const logoutButton = await appHelper.waitForElement(productsPage.logoutButton);
    await logoutButton.click();
  }
}

export default new ProductsAction();
