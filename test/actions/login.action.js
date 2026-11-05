import loginPage from '../pageobjects/login.page.js';

export class LoginAction {
  async enterUsername(username) {
    const fields = await $$(loginPage.usernameInput);
    if (fields.length >= 1) {
      await fields[0].setValue(username);
    }
  }

  async enterPassword(password) {
    const fields = await $$(loginPage.usernameInput);
    if (fields.length >= 2) {
      await fields[1].setValue(password);
    }
  }

  async clickLoginButton() {
    const loginButton = await $(loginPage.loginButton);
    await loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isLoginPage() {
    return $(loginPage.loginButton).isDisplayed();
  }

  async waitForProducts() {
    return $(loginPage.productsTitle).waitForDisplayed({ timeout: 15000 });
  }
}

export default new LoginAction();
