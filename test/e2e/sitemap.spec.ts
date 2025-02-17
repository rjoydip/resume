import { expect } from '@playwright/test'
import { XMLParser } from 'fast-xml-parser'
import { loadPage, parseXMLContent } from '../_shared/test-utils'
import { test } from '../setup/e2e.setup.ts'

test.use({ browserName: 'chromium' })
test.beforeEach(async ({ page }) => {
  await loadPage({ page, path: '/sitemap.xml' })
})

test.describe('<Sitemap />', () => {
  const parser = new XMLParser()
  const website_link = 'https://resume.rjoydip.com'

  test('should render <Sitemap /> page', async ({ page }) => {
    const pageContent = await page.content()
    expect(pageContent).toBeDefined()
  })

  test('should validate <Sitemap /> content', async ({ page, browserName }) => {
    const content = await page.content()
    const matchObjStructure = {
      urlset: {
        url: {
          loc: expect.stringContaining(website_link),
          lastmod: expect.any(String),
          changefreq: expect.stringMatching('yearly'),
          priority: 1,
        },
      },
    }
    const parsedContent = parseXMLContent(browserName, parser, content)
    expect(parsedContent).toMatchObject(matchObjStructure)
  })

  test('should contain correct URL in <loc>', async ({ page, browserName }) => {
    const content = await page.content()
    const parsedContent = parseXMLContent(browserName, parser, content)
    expect(parsedContent.urlset.url.loc).toBe(website_link)
  })

  test('should contain correct last modified date in <lastmod>', async ({ page, browserName }) => {
    const content = await page.content()
    const parsedContent = parseXMLContent(browserName, parser, content)
    expect(new Date(parsedContent.urlset.url.lastmod)).toBeInstanceOf(Date)
  })

  test('should contain correct change frequency in <changefreq>', async ({ page, browserName }) => {
    const content = await page.content()
    const parsedContent = parseXMLContent(browserName, parser, content)
    expect(parsedContent.urlset.url.changefreq).toBe('yearly')
  })

  test('should contain correct priority in <priority>', async ({ page, browserName }) => {
    const content = await page.content()
    const parsedContent = parseXMLContent(browserName, parser, content)
    expect(parsedContent.urlset.url.priority).toBe(1)
  })
})
