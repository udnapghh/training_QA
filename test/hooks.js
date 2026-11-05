import { mkdirSync } from 'node:fs';
import path from 'node:path';
import appHelper from './helpers/app.helper.js';
import loginAction from './actions/login.action.js';
import productsAction from './actions/products.action.js';

const screenshotDirectory = path.resolve('test-results', 'screenshots');

export async function beforeTest(test) {
  console.info(`Starting test: ${test.title}`);
  await appHelper.ensureLoggedOut(loginAction, productsAction);
}

export async function afterTest(test, _context, { error, passed }) {
  if (passed) {
    return;
  }

  const safeTitle = test.title.replace(/[^a-z0-9-]+/gi, '-').replace(/^-|-$/g, '');
  const screenshotPath = path.join(
    screenshotDirectory,
    `${Date.now()}-${safeTitle || 'failed-test'}.png`,
  );

  try {
    mkdirSync(screenshotDirectory, { recursive: true });
    await driver.saveScreenshot(screenshotPath);
    console.error(`Failure screenshot saved to ${screenshotPath}`);
  } catch (screenshotError) {
    console.error(
      `Could not capture screenshot for "${test.title}":`,
      screenshotError,
      'Original test error:',
      error,
    );
  }
}
