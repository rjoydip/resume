import { expect, test } from '@playwright/test'
import { XMLParser } from 'fast-xml-parser'
import { loadPage } from '../_shared/test-utils'

type BrowserName = "firefox" | "chromium" | "webkit"

function parseXMLContent(browserName: BrowserName, parser: any, content: string) {
  if (browserName === 'firefox') {
    return parser.parse(content)
  } else {
    const { html: { body } } = parser.parse(content)
    return body.div.at(0)
  }
}

test.use({ browserName: 'chromium' })

test.describe('<Sitemap />', () => {
  const parser = new XMLParser()
  const website_link = 'https://resume.rjoydip.com'

  test.beforeEach(async ({ page }) => {
    await loadPage({ page, path: '/sitemap.xml' })
  })

  test('should render <Sitemap /> component', async ({ page }) => {
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
