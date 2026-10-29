// Page: class berisi method untuk interaksi dengan element UI halaman Login
// Alur: specs -> page -> locator
const { until } = require('selenium-webdriver');
const LOGIN_LOCATORS = require('../locator/LoginPage.locator');
const LocatorHelper = require('../locator/LocatorHelper');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.locators = LOGIN_LOCATORS;
  }

  // ---------- Getters element ----------
  async usernameInput() {
    return this.driver.findElement(
      LocatorHelper.getBy(this.locators.selectors.usernameInput),
    );
  }

  async passwordInput() {
    return this.driver.findElement(
      LocatorHelper.getBy(this.locators.selectors.passwordInput),
    );
  }

  async loginButton() {
    return this.driver.findElement(
      LocatorHelper.getBy(this.locators.selectors.loginButton),
    );
  }

  async errorMessageElement() {
    return this.driver.findElement(
      LocatorHelper.getBy(this.locators.selectors.errorMessage),
    );
  }

  // ---------- Actions ----------
  async open() {
    await this.driver.get(this.locators.url);
    // Pastikan form login sudah tampil sebelum lanjut
    await this.driver.wait(
      until.elementLocated(
        LocatorHelper.getBy(this.locators.selectors.usernameInput),
      ),
      10000,
    );
  }

  async enterUsername(username) {
    const element = await this.usernameInput();
    await element.clear();
    await element.sendKeys(username);
  }

  async enterPassword(password) {
    const element = await this.passwordInput();
    await element.clear();
    await element.sendKeys(password);
  }

  async clickLogin() {
    const element = await this.loginButton();
    await element.click();
  }

  // Helper: lakukan seluruh alur login sekaligus
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // ---------- Verifikasi hasil ----------
  // Menunggu halaman inventory tampil (indikasi login sukses)
  async waitForInventoryPage(timeout = 10000) {
    await this.driver.wait(
      until.elementLocated(
        LocatorHelper.getBy(this.locators.selectors.inventoryContainer),
      ),
      timeout,
    );
  }

  // Mengambil teks judul app (Swag Labs) setelah login sukses
  async getAppLogoText() {
    const element = await this.driver.findElement(
      LocatorHelper.getBy(this.locators.selectors.appLogo),
    );
    return element.getText();
  }

  // Mengecek apakah sudah berada di halaman inventory
  async isOnInventoryPage() {
    const currentUrl = await this.driver.getCurrentUrl();
    return currentUrl.includes('inventory.html');
  }

  // Menunggu pesan error muncul & mengembalikan teksnya
  async getErrorMessage(timeout = 10000) {
    const errorEl = await this.driver.wait(
      until.elementLocated(
        LocatorHelper.getBy(this.locators.selectors.errorMessage),
      ),
      timeout,
    );
    await this.driver.wait(until.elementIsVisible(errorEl), timeout);
    return errorEl.getText();
  }
}

module.exports = LoginPage;
