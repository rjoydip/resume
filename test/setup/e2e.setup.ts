import type { Page } from '@playwright/test'
import { v4 as uuid } from '@lukeed/uuid/secure'
import { test as base, chromium, firefox, webkit } from '@playwright/test'
import { resumeData } from '../fixtures/data.fixture'

const listOfBlobs = ['about', 'educations', 'projects', 'skills', 'strengths', 'works']
const mockBlobs = Array.from({ length: listOfBlobs.length }).map((_, i) => {
  const name = listOfBlobs[i]
  const urlHash = uuid()
  const hashName = uuid()
  return {
    url: `https://${urlHash}.public.blob.vercel-storage.com/${name}-${hashName}.json`,
    downloadUrl: `https://${urlHash}.public.blob.vercel-storage.com/${name}-${hashName}.json?download=1`,
    pathname: `${name}.json`,
    size: Math.random(),
    uploadedAt: new Date(),
  }
})

async function setupBlobMocks(page: Page) {
  // Mock the main blob listing endpoint
  await page.route(/.*blob\.vercel-storage\.com.*/, async (route) => {
    await route.fulfill({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({
        hasMore: false,
        blobs: mockBlobs,
      }),
    })
  })

  // Mock individual blob content endpoints
  await page.route(/.*\.public\.blob\.vercel-storage\.com.*/, async (route) => {
    const url = route.request().url()
    // Extract the key from the URL (e.g., 'about', 'experience', etc.)
    const filename = url.split('/').pop()
    const key = filename ? filename.split('-')[0] : null

    if (key && key in resumeData) {
      await route.fulfill({
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
        body: JSON.stringify(resumeData[key as keyof typeof resumeData]),
      })
    }
    else {
      console.error(`No mock data found for key: ${key}`)
      await route.abort('failed')
    }
  })
}

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

    // Setup mock responses
    await setupBlobMocks(page)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page)

    // Teardown
    await context?.close()
    await browser?.close()
  },
})
