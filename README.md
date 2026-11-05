# Sauce Labs mobile automation

WebdriverIO and Appium tests for the supplied Sauce Labs Android demo app.

## Requirements

- Node.js and npm
- Android Studio with an Android 12 emulator named `Pixel_4`
- Android SDK platform tools (`adb`) available on `PATH`
- Java available on `PATH` for Allure

The APK is expected at `app/sauce-labs.2.7.1.apk`. The Appium service starts
with WebdriverIO; the UiAutomator2 driver is included in the project
dependencies.

## Run the tests

Start the `Pixel_4` emulator or let Appium start it, then run:

```sh
npm install
npm test
```

The suite covers valid login, invalid login, sorting by price from low to high,
and logout. Demo credentials are stored in `test_data/credentials.js`.

## Allure report and failure screenshots

After running tests, generate the Allure report and open it in a browser:

```sh
npm run allure:generate
npm run allure:open
```

Allure results are written to `allure-results/`; the generated report is in
`allure-report/`. Failed-test screenshots are saved to
`test-results/screenshots/`.
