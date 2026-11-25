import { expect, test } from '../../src/fixtures';

test.describe('Cart', () => {
  test('added product appears in cart', { tag: '@smoke' }, async ({ productsPage, cartPage }) => {
    await productsPage.goto();
    const name = await productsPage.addToCartByIndex(0);
    await productsPage.openCartFromModal();
    await expect(cartPage.rows).toHaveCount(1);
    expect(await cartPage.productNames()).toEqual([name]);
  });

  test('two different products give two cart rows', { tag: '@regression' }, async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.goto();
    const first = await productsPage.addToCartByIndex(0);
    await productsPage.continueShopping();
    const second = await productsPage.addToCartByIndex(1);
    await productsPage.openCartFromModal();
    await expect(cartPage.rows).toHaveCount(2);
    expect(await cartPage.productNames()).toEqual(expect.arrayContaining([first, second]));
  });
});
