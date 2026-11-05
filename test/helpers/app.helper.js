const DISPLAY_TIMEOUT = 15000;

export class AppHelper {
  async waitForElement(selector, timeout = DISPLAY_TIMEOUT) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  async isElementDisplayed(selector) {
    const element = await $(selector);
    return element.isDisplayed();
  }

  async ensureLoggedOut(loginAction, productsAction) {
    if (await loginAction.isLoginPage()) {
      return;
    }

    if (await this.isElementDisplayed('~test-PRODUCTS')) {
      await productsAction.logout();
      return;
    }

    await this.waitForElement('~test-LOGIN');
  }
}

export default new AppHelper();
