import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules', 'playwright-report', 'test-results', 'blob-report'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Hard waits make tests flaky: use auto-waiting locators and web-first assertions.
      'no-restricted-properties': [
        'error',
        { property: 'waitForTimeout', message: 'Do not use hard waits.' },
      ],
    },
  },
);
