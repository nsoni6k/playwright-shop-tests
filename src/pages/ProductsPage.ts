import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly path = '/products';
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cards: Locator;
  readonly searchedHeading: Locator;
  private readonly cartModal: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.cards = page.locator('.features_items .product-image-wrapper');
    this.searchedHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.cartModal = page.locator('#cartModal');
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  /** Adds the product at the given position and returns its name. */
  async addToCartByIndex(index: number): Promise<string> {
    const card = this.cards.nth(index);
    const name = (await card.locator('.productinfo p').first().innerText()).trim();
    await card.hover();
    await card.locator('.overlay-content .add-to-cart').click();
    await this.cartModal.waitFor({ state: 'visible' });
    return name;
  }

  async continueShopping(): Promise<void> {
    await this.cartModal.getByRole('button', { name: 'Continue Shopping' }).click();
    await this.cartModal.waitFor({ state: 'hidden' });
  }

  async openCartFromModal(): Promise<void> {
    await this.cartModal.getByRole('link', { name: 'View Cart' }).click();
  }
}
