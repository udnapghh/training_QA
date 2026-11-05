import { expect } from '@wdio/globals';
import loginAction from '../actions/login.action.js';
import { credentials } from '../../test_data/credentials.js';

describe('Swag Labs App', () => {
  it('logs in successfully with a valid user', async () => {
    await expect(await loginAction.isLoginPage()).toBe(true);
    await loginAction.login(credentials.valid.username, credentials.valid.password);
    await expect(await loginAction.waitForProducts()).toBeDisplayed();
  });

  it('shows an error when login credentials are invalid', async () => {
    await loginAction.login(credentials.invalid.username, credentials.invalid.password);

    await expect(await loginAction.isLoginPage()).toBe(true);
    await expect(await loginAction.getErrorMessage()).toContain(
      'Username and password do not match',
    );
  });
});
