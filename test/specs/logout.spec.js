import { expect } from '@wdio/globals';
import loginAction from '../actions/login.action.js';
import productsAction from '../actions/products.action.js';
import { credentials } from '../../test_data/credentials.js';

describe('Logout', () => {
  it('returns to the login screen after logout', async () => {
    await loginAction.login(credentials.valid.username, credentials.valid.password);
    await productsAction.waitForProducts();
    await productsAction.logout();
    await expect(await loginAction.isLoginPage()).toBe(true);
  });
});
