import { expect, test } from '../../src/fixtures';

test.describe('Login', () => {
  test('registered user can log in', { tag: '@smoke' }, async ({ loginPage, newUser }) => {
    await loginPage.goto();
    await loginPage.login(newUser.email, newUser.password);
    await expect(loginPage.loggedInAs(newUser.name)).toBeVisible();
  });

  test('wrong password shows an error', { tag: '@regression' }, async ({ loginPage, newUser }) => {
    await loginPage.goto();
    await loginPage.login(newUser.email, 'definitely-wrong');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('unknown email shows an error', { tag: '@regression' }, async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('nobody@example.com', 'whatever123');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
