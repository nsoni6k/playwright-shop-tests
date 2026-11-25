import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  loggedInAs(name: string): Locator {
    return this.page.getByText(`Logged in as ${name}`);
  }
}
