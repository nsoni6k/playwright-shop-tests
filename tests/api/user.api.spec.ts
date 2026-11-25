import { buildUser } from '../../src/data/userFactory';
import { expect, test } from '../../src/fixtures';

test.describe('User API', () => {
  test('account lifecycle: create, verify, fetch, delete', { tag: '@smoke' }, async ({
    userApi,
  }) => {
    const user = buildUser();

    const created = await userApi.create(user);
    expect(created.body).toEqual({ responseCode: 201, message: 'User created!' });

    try {
      const verified = await userApi.verifyLogin(user.email, user.password);
      expect(verified.body).toEqual({ responseCode: 200, message: 'User exists!' });

      const details = await userApi.getByEmail(user.email);
      expect(details.body.user.email).toBe(user.email);
      expect(details.body.user.name).toBe(user.name);
    } finally {
      const deleted = await userApi.delete(user.email, user.password);
      expect(deleted.body.responseCode).toBe(200);
    }
  });

  test('verifyLogin with wrong password returns 404', { tag: '@regression' }, async ({
    userApi,
    newUser,
  }) => {
    const { body } = await userApi.verifyLogin(newUser.email, 'wrong-password');
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('verifyLogin without password returns 400', { tag: '@regression' }, async ({
    userApi,
    newUser,
  }) => {
    const { body } = await userApi.verifyLogin(newUser.email);
    expect(body.responseCode).toBe(400);
  });

  test('creating a duplicate account is rejected', { tag: '@regression' }, async ({
    userApi,
    newUser,
  }) => {
    const { body } = await userApi.create(newUser);
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Email already exists!');
  });
});
