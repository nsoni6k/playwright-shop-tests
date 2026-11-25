import { expect, test } from '../../src/fixtures';

// API creates the data (fast, reliable), UI verifies behaviour, API cross-checks the backend.
test.describe('Hybrid: API setup + UI verification', () => {
  test('user created via API can log in via UI', { tag: '@smoke' }, async ({
    loginPage,
    userApi,
    newUser,
  }) => {
    await loginPage.goto();
    await loginPage.login(newUser.email, newUser.password);
    await expect(loginPage.loggedInAs(newUser.name)).toBeVisible();

    const details = await userApi.getByEmail(newUser.email);
    expect(details.body.user.name).toBe(newUser.name);
  });

  test('logged-in user can add a product to the cart', { tag: '@regression' }, async ({
    loginPage,
    productsPage,
    cartPage,
    newUser,
  }) => {
    await loginPage.goto();
    await loginPage.login(newUser.email, newUser.password);
    await expect(loginPage.loggedInAs(newUser.name)).toBeVisible();

    await productsPage.goto();
    const name = await productsPage.addToCartByIndex(0);
    await productsPage.openCartFromModal();
    expect(await cartPage.productNames()).toEqual([name]);
  });
});
