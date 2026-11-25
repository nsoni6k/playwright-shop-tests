import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL ?? 'https://automationexercise.com';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    // The demo site uses data-qa attributes, so getByTestId() maps to them.
    testIdAttribute: 'data-qa',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'ui', testDir: './tests/ui', use: { ...devices['Desktop Chrome'] } },
    { name: 'hybrid', testDir: './tests/hybrid', use: { ...devices['Desktop Chrome'] } },
    { name: 'api', testDir: './tests/api' },
  ],
});
