// ScreenshotPage: method untuk mengambil screenshot (full page & element)
const fs = require('fs');
const path = require('path');
const { By } = require('selenium-webdriver');

class ScreenshotPage {
  constructor(driver) {
    this.driver = driver;
    this.screenshotDir = path.join(__dirname, '..', 'screenshots');
  }

  // Pastikan folder tujuan ada sebelum menulis file
  ensureDir(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Screenshot seluruh halaman yang tampil di browser
  // filename contoh: 'current/login_success.png'
  async takeFullScreenshot(filename) {
    const screenshotPath = path.join(this.screenshotDir, filename);
    this.ensureDir(screenshotPath);

    const screenshot = await this.driver.takeScreenshot();
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    return screenshotPath;
  }

  // Screenshot hanya pada element tertentu
  async takeElementScreenshot(selector, filename) {
    const screenshotPath = path.join(this.screenshotDir, filename);
    this.ensureDir(screenshotPath);

    const element = await this.driver.findElement(By.css(selector));
    const screenshot = await element.takeScreenshot(true);
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    return screenshotPath;
  }
}

module.exports = ScreenshotPage;
