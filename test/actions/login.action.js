import loginPage from '../pageobjects/login.page.js';
import appHelper from '../helpers/app.helper.js';

export class LoginAction {
  async enterUsername(username) {
    const usernameInput = await appHelper.waitForElement(loginPage.usernameInput);
    await usernameInput.setValue(username);
  }

  async enterPassword(password) {
    const passwordInput = await appHelper.waitForElement(loginPage.passwordInput);
    await passwordInput.setValue(password);
  }

  async clickLoginButton() {
    const loginButton = await appHelper.waitForElement(loginPage.loginButton);
    await loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isLoginPage() {
    return appHelper.isElementDisplayed(loginPage.loginButton);
  }

  async waitForProducts() {
    return appHelper.waitForElement(loginPage.productsTitle);
  }

  async getErrorMessage() {
    const errorMessage = await appHelper.waitForElement(loginPage.errorMessage);
    return errorMessage.getText();
  }
}

export default new LoginAction();
