export class ProductsPage {
  get productsTitle() {
    return '~test-PRODUCTS';
  }

  get sortButton() {
    return '~test-Modal Selector Button';
  }

  get priceLowToHighOption() {
    return 'android=new UiSelector().text("Price (low to high)")';
  }

  get sortDialogTitle() {
    return 'android=new UiSelector().text("Sort items by...")';
  }

  get productPrices() {
    return 'android=new UiSelector().textStartsWith("$")';
  }

  get menuButton() {
    return '~test-Menu';
  }

  get logoutButton() {
    return '~test-LOGOUT';
  }
}

export default new ProductsPage();
