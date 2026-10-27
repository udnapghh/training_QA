const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Login Belajar Bareng', function () {
  let driver;
  const baseUrl = 'https://belajar-bareng.onrender.com/';

  // Hook before: Berjalan 1x sebelum seluruh test dilakukan
  before(async function () {
    console.log('=== Memulai Automation Test Login ===');
  });

  // Hook beforeEach: Berjalan sebelum setiap skenario (it) dijalankan
  beforeEach(async function () {
    let options = new chrome.Options();
    // Aktifkan jika ingin mode Headless:
    // options.addArguments('--headless');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get(baseUrl);
  });

  // Hook afterEach: Berjalan setelah setiap skenario (it) dijalankan
  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  // Hook after: Berjalan 1x setelah seluruh test dilakukan
  after(async function () {
    console.log('=== Selesai Menjalankan Automation Test Login ===');
  });

  // Skenario 1: Login dengan kredensial valid
  it('[Sanity] should login with valid credentials', async function () {
    await driver
      .findElement(
        By.css('[data-testid="username-input"], input[placeholder="Username"]'),
      )
      .sendKeys('admin');

    await driver
      .findElement(
        By.css('[data-testid="password-input"], input[placeholder="Password"]'),
      )
      .sendKeys('admin');

    await driver
      .findElement(
        By.css("[data-testid='login-button'], button[type='submit']"),
      )
      .click();

    // Tunggu beberapa saat atau cek perpindahan halaman setelah berhasil login
    await driver.sleep(2000);
  });

  // Skenario 2: Login dengan username atau password salah (Toast Notification)
  it('[Regression] should not login with invalid username or password', async function () {
    await driver
      .findElement(
        By.css('[data-testid="username-input"], input[placeholder="Username"]'),
      )
      .sendKeys('adasd');

    await driver
      .findElement(
        By.css('[data-testid="password-input"], input[placeholder="Password"]'),
      )
      .sendKeys('password_salah');

    await driver
      .findElement(
        By.css("[data-testid='login-button'], button[type='submit']"),
      )
      .click();

    // <div data-testid="toast-content">Invalid username or password!</div>
    // 1. Tunggu elemen ada di DOM
    const toastError = await driver.wait(
      until.elementLocated(By.css('[data-testid="toast-content"]')),
      5000,
    );

    // 2. Tunggu elemen toast terlihat dan teksnya sesuai
    await driver.wait(until.elementIsVisible(toastError), 5000);
    await driver.wait(
      until.elementTextContains(toastError, 'Invalid username or password!'),
      5000,
    );

    // 3. Ambil teks dan lakukan validasi
    const errorText = await toastError.getText();
    assert.ok(errorText.includes('Invalid username or password!'));
  });

  // // Skenario 3: Login dengan password kosong ("Please fill out this field.")
  it('[Regression] should not login with empty password', async function () {
    await driver
      .findElement(
        By.css('[data-testid="username-input"], input[placeholder="Username"]'),
      )
      .sendKeys('adasd');

    const passwordInput = await driver.findElement(
      By.css('[data-testid="password-input"], input[placeholder="Password"]'),
    );
    await passwordInput.sendKeys('');

    await driver
      .findElement(
        By.css("[data-testid='login-button'], button[type='submit']"),
      )
      .click();

    // Mengambil pesan pop-up "Please fill out this field." dari elemen input password
    const validationMessage =
      await passwordInput.getAttribute('validationMessage');
    assert.strictEqual(validationMessage, 'Please fill out this field.');
  });

  // Skenario 4: Login dengan username kosong ("Please fill out this field.")
  it('[Regression] should not login with empty username', async function () {
    const usernameInput = await driver.findElement(
      By.css('[data-testid="username-input"], input[placeholder="Username"]'),
    );
    await usernameInput.sendKeys('');

    await driver
      .findElement(
        By.css('[data-testid="password-input"], input[placeholder="Password"]'),
      )
      .sendKeys('123456');

    await driver
      .findElement(
        By.css("[data-testid='login-button'], button[type='submit']"),
      )
      .click();

    // Mengambil pesan pop-up "Please fill out this field." dari elemen input username
    const validationMessage =
      await usernameInput.getAttribute('validationMessage');
    assert.strictEqual(validationMessage, 'Please fill out this field.');
  });

  // Skenario 5: Login dengan username dan password kosong
  it('[Regression] should not login with empty username and password', async function () {
    const usernameInput = await driver.findElement(
      By.css('[data-testid="username-input"], input[placeholder="Username"]'),
    );
    await usernameInput.sendKeys('');

    const passwordInput = await driver.findElement(
      By.css('[data-testid="password-input"], input[placeholder="Password"]'),
    );
    await passwordInput.sendKeys('');

    await driver
      .findElement(
        By.css("[data-testid='login-button'], button[type='submit']"),
      )
      .click();

    const validationMessage =
      await usernameInput.getAttribute('validationMessage');
    assert.strictEqual(validationMessage, 'Please fill out this field.');
  });
});
