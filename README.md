# Playwright Shop Tests

![CI](https://github.com/NSONI6K/playwright-shop-tests/actions/workflows/playwright.yml/badge.svg)

End-to-end test framework for the public demo shop [automationexercise.com](https://automationexercise.com),
built with **Playwright + TypeScript** using the **Page Object Model**. UI and API tests live in one repo.

**[Latest HTML report](https://NSONI6K.github.io/playwright-shop-tests/)** (published by CI from `main`)

## What is covered

| Layer  | Tests | Examples |
| ------ | ----- | -------- |
| UI     | 8     | login (valid/invalid), product list, search, add to cart |
| API    | 9     | product list schema, search, negative cases, account lifecycle |
| Hybrid | 2     | user created through the API, then verified in the UI |

## Design decisions

- **Page Objects + custom fixtures** (`src/pages`, `src/fixtures`): tests receive ready-made page objects, no `new Page()` boilerplate.
- **API for test setup**: the `newUser` fixture creates a unique user via the API and deletes it afterwards, so tests are independent and parallel-safe.
- **Locators**: `getByRole`, `getByTestId` (mapped to the site's `data-qa` attribute) and text. No XPath, no hard waits (ESLint forbids `waitForTimeout`).
- **Typed API clients** (`src/api`): the demo API returns HTTP 200 with the real status in `body.responseCode`, so the client parses the body and exposes both.
- **Three Playwright projects** (`ui`, `api`, `hybrid`) so each layer can run on its own.
- **Tags**: `@smoke` and `@regression`.
- **Ad blocking** in the page fixture, because the demo site's ad overlays cause flaky clicks.

## Prerequisites

- Node.js 20 or newer (`node -v`)
- Git

## Setup

```bash
git clone https://github.com/NSONI6K/playwright-shop-tests.git
cd playwright-shop-tests
npm ci
npx playwright install chromium
cp .env.example .env   # optional
```

## Running tests

```bash
npm test               # everything
npm run test:ui        # UI only
npm run test:api       # API only
npm run test:hybrid    # hybrid only
npm run test:smoke     # only @smoke tests
npm run test:headed    # watch the browser
npm run report         # open the last HTML report
```

## CI

`.github/workflows/playwright.yml` runs on every push and pull request: typecheck, lint, tests.
The HTML report is always uploaded as an artifact and published to GitHub Pages from `main`
(enable once under Settings > Pages > Source: **GitHub Actions**).

## Project structure

```
src/pages      page objects        src/api       typed API clients
src/fixtures   custom fixtures     src/data      test data factory
tests/ui | api | hybrid            .github/workflows/playwright.yml
```

## Next steps

Checkout flow, visual comparison tests, accessibility checks with axe, API contract validation with a schema library.
