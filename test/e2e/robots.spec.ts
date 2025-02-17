import { expect } from '@playwright/test'
import { loadPage } from '../_shared/test-utils.ts'
import { test } from '../setup/e2e.setup.ts'

test.use({ browserName: 'chromium' })
test.beforeEach(async ({ page }) => {
  await loadPage({ page, path: '/robots.txt' })
})

test.describe('robots', () => {
  test('should render robots page', async ({ page }) => {
    const pageContent = await page.content()
    expect(pageContent).toBeDefined()
  })

  test('should validate robots content', async ({ page }) => {
    const content = await page.content()
    expect(content).toMatch(/rjoydip.com/)
    expect(content).toMatch(/sitemap.xml/)
    expect(content).toMatch('User-Agent: *')
    expect(content).toMatch('Allow: /')
    expect(content).toMatch('Disallow: /private/')
  })
})
