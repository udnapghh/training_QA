// Specs: test case Login SauceDemo (positive & negative)
// Setiap test case: terdapat assertion + visual regression
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

const LoginPage = require('../page/LoginPage');
const ScreenshotPage = require('../page/ScreenshotPage');
const VisualRegressionHelper = require('../utilities/VisualRegressionHelper');

describe('SauceDemo - Login Test (POM)', function () {
  // Timeout dinaikkan karena melibatkan browser real + screenshot
  this.timeout(60000);

  let driver;
  let loginPage;
  let screenshotPage;
  let visualRegression;

  before(async function () {
    console.log('=== Memulai Automation Test Login SauceDemo ===');
    visualRegression = new VisualRegressionHelper();
  });

  beforeEach(async function () {
    const options = new chrome.Options();
    // Window size dibuat tetap agar screenshot konsisten untuk visual regression
    options.addArguments('--window-size=1280,800');
    options.addArguments('--force-device-scale-factor=1');
    // Aktifkan headless jika ingin jalan tanpa membuka jendela browser:
    // options.addArguments('--headless=new');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    loginPage = new LoginPage(driver);
    screenshotPage = new ScreenshotPage(driver);

    await loginPage.open();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  after(async function () {
    console.log('=== Selesai Menjalankan Automation Test Login SauceDemo ===');
  });

  // Helper untuk menjalankan visual regression + assertion threshold
  async function runVisualRegression(imageName) {
    await screenshotPage.takeFullScreenshot(`current/${imageName}`);
    const result = await visualRegression.compareImages(imageName);

    if (!result.hasBaseline) {
      console.log(`[Visual Regression] Baseline dibuat untuk ${imageName}`);
    } else {
      console.log(
        `[Visual Regression] ${imageName} -> match: ${result.match}, kemiripan: ${result.matchPercentage}%`,
      );
    }

    // Assertion visual regression: kemiripan minimal 95%
    assert.ok(
      result.matchPercentage >= 95,
      `Perubahan visual terlalu besar pada ${imageName} (kemiripan ${result.matchPercentage}%)`,
    );
    return result;
  }

  // ---------- POSITIVE TEST CASE ----------
  it('[Positive] should login successfully with valid credentials', async function () {
    await loginPage.login('standard_user', 'secret_sauce');

    // Tunggu halaman inventory tampil
    await loginPage.waitForInventoryPage();

    // Assertion 1: URL berpindah ke halaman inventory
    const onInventory = await loginPage.isOnInventoryPage();
    assert.strictEqual(
      onInventory,
      true,
      'Seharusnya berpindah ke halaman inventory setelah login sukses',
    );

    // Assertion 2: judul aplikasi tampil "Swag Labs"
    const logoText = await loginPage.getAppLogoText();
    assert.strictEqual(logoText, 'Swag Labs');

    // Visual regression
    await runVisualRegression('login_success.png');
  });

  // ---------- NEGATIVE TEST CASE 1: Invalid username ----------
  it('[Negative] should not login with invalid username', async function () {
    await loginPage.login('invalid_user', 'secret_sauce');

    // Assertion: pesan error tampil
    const errorText = await loginPage.getErrorMessage();
    assert.ok(
      errorText.includes('Username and password do not match'),
      `Pesan error tidak sesuai. Dapat: "${errorText}"`,
    );

    // Visual regression
    await runVisualRegression('login_invalid_username.png');
  });

  // ---------- NEGATIVE TEST CASE 2: Wrong password ----------
  it('[Negative] should not login with wrong password', async function () {
    await loginPage.login('standard_user', 'wrong_password');

    // Assertion: pesan error tampil
    const errorText = await loginPage.getErrorMessage();
    assert.ok(
      errorText.includes('Username and password do not match'),
      `Pesan error tidak sesuai. Dapat: "${errorText}"`,
    );

    // Visual regression
    await runVisualRegression('login_wrong_password.png');
  });

  // ---------- NEGATIVE TEST CASE 3: Locked out user ----------
  it('[Negative] should not login with locked_out_user', async function () {
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Assertion: pesan error user terkunci tampil
    const errorText = await loginPage.getErrorMessage();
    assert.ok(
      errorText.includes('Sorry, this user has been locked out'),
      `Pesan error tidak sesuai. Dapat: "${errorText}"`,
    );

    // Visual regression
    await runVisualRegression('login_locked_out_user.png');
  });
});
