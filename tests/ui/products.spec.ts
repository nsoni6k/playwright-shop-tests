import { expect, test } from '../../src/fixtures';

test.describe('Products', () => {
  test('product list is displayed', { tag: '@smoke' }, async ({ productsPage }) => {
    await productsPage.goto();
    await expect(productsPage.cards.first()).toBeVisible();
    expect(await productsPage.cards.count()).toBeGreaterThan(5);
  });

  test('search returns matching products', { tag: '@smoke' }, async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.search('top');
    await expect(productsPage.searchedHeading).toBeVisible();
    await expect(productsPage.cards.first()).toBeVisible();
  });

  test('search with no match returns nothing', { tag: '@regression' }, async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.search('zzzz-no-such-product');
    await expect(productsPage.searchedHeading).toBeVisible();
    await expect(productsPage.cards).toHaveCount(0);
  });
});
