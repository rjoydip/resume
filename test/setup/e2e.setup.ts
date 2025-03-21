import { test as base, chromium, firefox, webkit } from '@playwright/test'

// Custom fixture to handle setup and teardown
export const test = base.extend({
  page: async ({ page, browserName }, use) => {
    const browserInstance = browserName === 'chromium' ? chromium : browserName === 'firefox' ? firefox : browserName === 'webkit' ? webkit : chromium
    const browser = await browserInstance.launch({
      args: [
        '--disable-web-security',
      ],
    })

    const context = await browser.newContext({
      bypassCSP: true,
      ignoreHTTPSErrors: true,
      // Handle CORS by setting headers
      extraHTTPHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page)

    // Teardown
    await context?.close()
    await browser?.close()
  },
})
