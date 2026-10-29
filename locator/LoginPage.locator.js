// Locator: menyimpan semua selector untuk halaman Login SauceDemo

const LOGIN_LOCATORS = {
  url: 'https://www.saucedemo.com/',
  selectors: {
    usernameInput: { type: 'id', value: 'user-name' },
    passwordInput: { type: 'id', value: 'password' },
    loginButton: { type: 'id', value: 'login-button' },
    errorMessage: { type: 'css', value: '[data-test="error"]' },
    // Elemen yang muncul setelah login sukses (halaman inventory)
    inventoryContainer: { type: 'id', value: 'inventory_container' },
    appLogo: { type: 'css', value: '.app_logo' },
    shoppingCart: { type: 'css', value: '.shopping_cart_link' },
  },
};

module.exports = LOGIN_LOCATORS;
