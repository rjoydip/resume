import type { Browser, Page } from 'playwright'
import { XMLParser } from 'fast-xml-parser'
import { chromium } from 'playwright'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('<Sitemap />', () => {
  let browser: Browser
  let page: Page
  const parser = new XMLParser()

  beforeAll(async () => {
    browser = await chromium.launch()
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto('http://localhost:3000/sitemap.xml')
  })

  afterAll(async () => {
    await browser.close()
  })

  it('should render <Sitemap /> component', async () => {
    const pageContent = await page.content()
    expect(pageContent).toBeDefined()
  })

  it('should validate <Sitemap /> content', async () => {
    const pageContent = await page.content()
    const { html: { body } } = parser.parse(pageContent)
    expect(body.div).toBeDefined()
    expect(body.div[0]).toMatchObject({
      urlset: {
        url: {
          loc: expect.stringContaining('https://rjoydip.com'),
          lastmod: expect.any(String),
          changefreq: expect.stringMatching('yearly'),
          priority: 1,
        },
      },
    })
  })

  it('should contain correct URL in <loc>', async () => {
    const pageContent = await page.content()
    const { html: { body } } = parser.parse(pageContent)
    const loc = body.div[0].urlset.url.loc
    expect(loc).toBe('https://rjoydip.com')
  })

  it('should contain correct last modified date in <lastmod>', async () => {
    const pageContent = await page.content()
    const { html: { body } } = parser.parse(pageContent)
    const lastmod = body.div[0].urlset.url.lastmod
    expect(new Date(lastmod)).toBeInstanceOf(Date)
  })

  it('should contain correct change frequency in <changefreq>', async () => {
    const pageContent = await page.content()
    const { html: { body } } = parser.parse(pageContent)
    const changefreq = body.div[0].urlset.url.changefreq
    expect(changefreq).toBe('yearly')
  })

  it('should contain correct priority in <priority>', async () => {
    const pageContent = await page.content()
    const { html: { body } } = parser.parse(pageContent)
    const priority = body.div[0].urlset.url.priority
    expect(priority).toBe(1)
  })
})
