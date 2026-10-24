const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Web UI Automation - Belajar Bareng', function() {
    let driver;

    // Menjalankan browser sebelum test dimulai
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    // Menutup browser setelah test selesai
    after(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('1. User should be able to login with valid data', async function() {
        // 1. Buka halaman login
        await driver.get('https://belajar-bareng.onrender.com/');

        // 2. Cari elemen username, password, dan tombol login
        let usernameInput = await driver.wait(
            until.elementLocated(By.xpath("//input[@data-testid='username-input']")),
            15000
        );
        let passwordInput = await driver.findElement(
            By.css(".password-wrapper input, input[type='password']")
        );
        let loginButton = await driver.findElement(
            By.xpath("//button[@data-testid='login-button']")
        );

        // 3. Beri aksi input text dan klik tombol login
        await usernameInput.sendKeys("admin");
        await passwordInput.sendKeys("admin");
        await loginButton.click();

        // 4. Tunggu hingga berpindah ke halaman /users dan element List Users tampil
        await driver.wait(until.urlContains("/users"), 15000);
        let listUsersHeading = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'List Users')]")),
            10000
        );

        // 5. Assertion: Validasi element tampil (.isDisplayed) dan teks sesuai (.strictEqual)
        let isListUsersDisplayed = await listUsersHeading.isDisplayed();
        assert.strictEqual(isListUsersDisplayed, true);

        let headingText = await listUsersHeading.getText();
        assert.strictEqual(headingText, "List Users");
    });

    it("2. User should be able to add a new user", async function () {
        // 1. Cari tombol Add User dan klik
        let addButton = await driver.wait(
            until.elementLocated(By.xpath("//button[@data-testid='add-button']")),
            10000
        );
        await addButton.click();

        // Tunggu hingga muncul form input nama dan umur
        let nameInput = await driver.wait(
            until.elementLocated(
                By.xpath("//input[@placeholder='Name' or @placeholder='Username' or @data-testid='username-input' or @type='text']")
            ),
            10000
        );
        let ageInput = await driver.findElement(
            By.xpath("//input[@placeholder='Age' or @data-testid='age-input' or @type='number']")
        );
        let submitButton = await driver.findElement(
            By.xpath("//button[@data-testid='submit-button' or @type='submit']")
        );

        // 2. Beri aksi input nama dan umur user baru, lalu klik tombol Submit/Add
        const newUserName = "Pandu";
        const newUserAge = "25";

        await nameInput.clear();
        await nameInput.sendKeys(newUserName);
        await ageInput.clear();
        await ageInput.sendKeys(newUserAge);
        await submitButton.click();

        // 3. Tunggu toast muncul di HTML dan terlihat di layar
        let toastMessage = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'User successfully added')]")),
            10000
        );
        await driver.wait(until.elementIsVisible(toastMessage), 10000);

        // 4. Assertion: Validasi toast tampil (.isDisplayed) dan teks sesuai (.strictEqual)
        let isToastDisplayed = await toastMessage.isDisplayed();
        assert.strictEqual(isToastDisplayed, true);

        let toastText = await toastMessage.getText();
        assert.strictEqual(toastText.includes("User successfully added"), true);
    });
});