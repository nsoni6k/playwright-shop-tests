import { expect, test } from '../../src/fixtures';

test.describe('Products API', () => {
  test('GET productsList returns products with the expected shape', { tag: '@smoke' }, async ({
    productsApi,
  }) => {
    const { httpStatus, body } = await productsApi.list();
    expect(httpStatus).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.stringContaining('Rs.'),
        brand: expect.any(String),
      }),
    );
  });

  test('POST productsList is not supported', { tag: '@regression' }, async ({ productsApi }) => {
    const { body } = await productsApi.postToList();
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('not supported');
  });

  test('GET brandsList returns brands', { tag: '@regression' }, async ({ productsApi }) => {
    const { body } = await productsApi.brands();
    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
  });

  test('POST searchProduct returns matching products', { tag: '@smoke' }, async ({
    productsApi,
  }) => {
    const { body } = await productsApi.search('top');
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST searchProduct without a term returns 400', { tag: '@regression' }, async ({
    productsApi,
  }) => {
    const { body } = await productsApi.search();
    expect(body.responseCode).toBe(400);
  });
});
