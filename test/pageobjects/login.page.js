export class LoginPage {
  get loginButton() {
    return '~test-LOGIN';
  }

  get productsTitle() {
    return '~test-PRODUCTS';
  }

  get usernameInput() {
    return '~test-Username';
  }

  get passwordInput() {
    return '~test-Password';
  }

  get errorMessage() {
    return 'android=new UiSelector().textContains("Username and password do not match")';
  }
}

export default new LoginPage();
