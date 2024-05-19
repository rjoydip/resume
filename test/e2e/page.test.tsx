import type { Browser, Page } from 'playwright'
import { chromium } from 'playwright'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('<Page />', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await chromium.launch()
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto('http://localhost:3000')
  })

  afterAll(async () => {
    await browser.close()
  })

  it('should render <Page /> component', async () => {
    const title = await page.title()
    expect(title).toBe('Joydip Roy')
  })
})
