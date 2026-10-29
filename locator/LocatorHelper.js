// LocatorHelper: mengubah object locator { type, value } menjadi Selenium By
const { By } = require('selenium-webdriver');

class LocatorHelper {
  // Mengembalikan objek By berdasarkan type locator
  static getBy(locator) {
    const { type, value } = locator;

    switch (type) {
      case 'id':
        return By.id(value);
      case 'css':
        return By.css(value);
      case 'xpath':
        return By.xpath(value);
      case 'name':
        return By.name(value);
      case 'className':
        return By.className(value);
      case 'linkText':
        return By.linkText(value);
      default:
        throw new Error(`Locator type tidak didukung: ${type}`);
    }
  }
}

module.exports = LocatorHelper;
