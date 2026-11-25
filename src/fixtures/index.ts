import { test as base, expect } from '@playwright/test';
import { ProductsApi } from '../api/productsApi';
import { UserApi } from '../api/userApi';
import { buildUser, UserData } from '../data/userFactory';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  userApi: UserApi;
  productsApi: ProductsApi;
  /** A fresh user created through the API and deleted after the test. */
  newUser: UserData;
};

export const test = base.extend<Fixtures>({
  // Block ad/tracking requests: the demo site's ad overlays cause flaky clicks.
  page: async ({ page }, use) => {
    await page.route(/googlesyndication|doubleclick|googleads|adservice|google_vignette/, (r) =>
      r.abort(),
    );
    await use(page);
  },
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  userApi: async ({ request }, use) => use(new UserApi(request)),
  productsApi: async ({ request }, use) => use(new ProductsApi(request)),
  newUser: async ({ userApi }, use) => {
    const user = buildUser();
    const created = await userApi.create(user);
    expect(created.body.responseCode, 'user setup via API').toBe(201);
    await use(user);
    await userApi.delete(user.email, user.password);
  },
});

export { expect };
