# Homework 11 - Web UI Automation (Login SauceDemo)

Automation testing halaman login [SauceDemo](https://www.saucedemo.com/) menggunakan
**Selenium WebDriver** dengan pola **Page Object Model (POM)** dan **Visual Regression**.

## Struktur Project (POM)

```
Homework 11/
├── locator/
│   ├── LoginPage.locator.js      # kumpulan selector (type + value)
│   └── LocatorHelper.js          # konversi locator -> Selenium By
├── page/
│   ├── LoginPage.js              # method interaksi dengan element UI login
│   └── ScreenshotPage.js         # method ambil screenshot (full & element)
├── specs/
│   └── Login.spec.js             # test case (positive & negative)
├── utilities/
│   └── VisualRegressionHelper.js # bandingkan baseline vs current (pixelmatch)
├── screenshots/
│   ├── baseline/                 # gambar acuan
│   ├── current/                  # screenshot run terbaru
│   └── diff/                     # visualisasi perbedaan
├── package.json
└── README.md
```

Alur: `specs -> page -> locator`

## Test Case

| No | Tipe      | Skenario                         | Assertion                                                  |
|----|-----------|----------------------------------|------------------------------------------------------------|
| 1  | Positive  | Login sukses (standard_user)     | URL ke inventory + judul "Swag Labs" + visual regression   |
| 2  | Negative  | Invalid username                 | Pesan error "Username and password do not match"           |
| 3  | Negative  | Wrong password                   | Pesan error "Username and password do not match"           |
| 4  | Negative  | locked_out_user                  | Pesan error "Sorry, this user has been locked out"         |

Setiap test case memiliki **assertion** dan **visual regression**
(assertion kemiripan minimal 95% terhadap baseline).

## Cara Menjalankan

```bash
# install dependency
npm install

# jalankan test
npm test
```

> Run pertama akan membuat baseline otomatis. Run berikutnya membandingkan
> screenshot current dengan baseline dan menghasilkan gambar diff.

## Libraries

- [selenium-webdriver](https://www.selenium.dev/)
- [pixelmatch](https://www.npmjs.com/package/pixelmatch) (v5, CommonJS compatible)
- [pngjs](https://www.npmjs.com/package/pngjs)
- [mocha](https://mochajs.org/) sebagai test runner
