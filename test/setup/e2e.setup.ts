import type { Browser, BrowserContext, Page } from '@playwright/test'
import { chromium } from '@playwright/test'
import { resumeData } from '../fixtures/data.fixture'

let browser: Browser
let context: BrowserContext
let page: Page

function getBlobMocks() {
  const listOfBlobs = ['about', 'educations', 'projects', 'skills', 'strengths', 'works']
  const blobs = Array.from({ length: 6 }).map((_, i) => {
    const name = listOfBlobs[i]
    const urlHash = Math.random().toString()
    const hashName = Math.random().toString()
    return {
      url: `https://${urlHash}.public.blob.vercel-storage.com/${name}-${hashName}.json`,
      downloadUrl: `https://${urlHash}.public.blob.vercel-storage.com/${name}-${hashName}.json?download=1`,
      pathname: `${name}.json`,
      size: Math.random(),
      uploadedAt: new Date(),
    }
  })

  return {
    hasMore: false,
    blobs,
  }
}

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
      body: JSON.stringify(getBlobMocks()),
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

async function globalSetup() {
  browser = await chromium.launch({
    args: [
      '--disable-web-security',
    ],
  })

  context = await browser.newContext({
    bypassCSP: true,
    ignoreHTTPSErrors: true,
    // Handle CORS by setting headers
    extraHTTPHeaders: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  })

  page = await context.newPage()

  // Setup mock responses
  await setupBlobMocks(page)

  return { page }
}

async function globalTeardown() {
  await context?.close()
  await browser?.close()
}

export { globalSetup, globalTeardown }
