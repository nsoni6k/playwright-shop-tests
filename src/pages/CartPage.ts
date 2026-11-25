import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly path = '/view_cart';
  readonly rows: Locator;

  constructor(page: Page) {
    super(page);
    this.rows = page.locator('#cart_info_table tbody tr');
  }

  async productNames(): Promise<string[]> {
    const names = await this.rows.locator('.cart_description h4 a').allInnerTexts();
    return names.map((n) => n.trim());
  }

  quantityOfRow(index: number): Locator {
    return this.rows.nth(index).locator('.cart_quantity button');
  }
}
