import { expect } from '@wdio/globals';
import loginAction from '../actions/login.action.js';
import productsAction from '../actions/products.action.js';
import { credentials } from '../../test_data/credentials.js';

describe('Product sorting', () => {
  it('sorts products by price from low to high', async () => {
    await loginAction.login(credentials.valid.username, credentials.valid.password);
    await productsAction.waitForProducts();
    await productsAction.sortPricesLowToHigh();

    const prices = await productsAction.getProductPrices();
    const formattedPrices = prices.map((price) => `$${price.toFixed(2)}`).join(', ');
    console.info('Sorted prices low to high:', formattedPrices);
    await expect(prices.length).toBeGreaterThan(1);
    await expect(prices).toEqual([...prices].sort((first, second) => first - second));
  });
});
