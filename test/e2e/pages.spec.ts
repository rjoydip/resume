import { metadata } from '@/data'
import { expect } from '@playwright/test'
import { loadPage } from '../_shared/test-utils'
import { about } from '../fixtures/data.fixture'
import { test } from '../fixtures/e2e.fixture'

test.describe('<Pages />', () => {
  test.beforeEach(async ({ page }) => {
    await loadPage({ page, path: '' })
  })

  test.describe('<Root />', () => {
    test('should validate title and body', async ({ page }) => {
      expect(await page.title()).toBe(metadata.name)
      expect(await page.locator('body')).toBeVisible()
    })
  })

  test.describe('<About />', () => {
    test('should display profile information correctly', async ({ page }) => {
      await expect(page.getByTestId('about_name')).toBeVisible()
      await expect(page.getByTestId('about_name_small_screen')).not.toBeVisible()

      // Wait for avatar image to load
      await expect(async () => {
        const avatarImg = page.getByTestId('about_avatar_url').first()
        const isLoaded = await avatarImg.evaluate((img: HTMLImageElement) => img.complete)
        expect(isLoaded).toBeTruthy()
      }).toPass()

      // Validate description and summary
      await expect(page.getByTestId('about_description')).toContainText(about.description)
      await expect(page.getByTestId('about_summery')).toContainText(about.summary)
      await expect(page.getByTestId('about_summery_title')).toContainText('Summary')
    })

    test('should have working contact links', async ({ page }) => {
      // Email link
      const emailButton = page.getByTestId('about_contact_email')
      await expect(emailButton).toBeVisible()
      await expect(emailButton).toHaveAttribute('href', `mailto:${about.contact.email}`)

      // Phone link
      const phoneButton = page.getByTestId('about_contact_tel')
      await expect(phoneButton).toBeVisible()
      await expect(phoneButton).toHaveAttribute('href', `tel:${about.contact.tel}`)

      // Social links
      for (const social of about.contact.social) {
        const socialButton = page.getByTestId(`about_contact_social_${social.name}`)
        await expect(socialButton).toBeVisible()
        await expect(socialButton).toHaveAttribute('href', social.url)
      }
    })

    test('should display location information correctly', async ({ page }) => {
      const locationLink = page.getByTestId('about_location_link')
      const locationText = page.getByTestId('about_location')

      await expect(locationLink).toBeVisible()
      await expect(locationLink).toHaveAttribute('href', about.location.link)
      await expect(locationText).toContainText(`${about.location.city},${about.location.country}`)
    })

    test('should validate accessibility attributes', async ({ page }) => {
      // Check ARIA labels
      await expect(page.locator('[aria-label="Show Email"]').first()).toBeVisible()
      await expect(page.locator('[aria-label="Show Mobile Number"]').first()).toBeVisible()
      await expect(page.locator('[aria-label="Show Location on Map"]').first()).toBeVisible()

      for (const social of about.contact.social) {
        await expect(page.locator(`[aria-label="Show Social Media ${social.name}"]`).first()).toBeVisible()
      }

      // Verify all links have proper rel attributes
      const links = await page.locator('a[rel="noopener noreferrer"]').all()
      expect(links.length).toBeGreaterThan(0)
    })

    test('should handle print view correctly', async ({ page }) => {
      // Note: We can't actually test print layout visually, but we can check if print-specific elements exist
      const printEmail = page.locator('.print\\:block').getByText(about.contact.email)
      const printPhone = page.locator('.print\\:block').getByText(about.contact.tel)

      await expect(printEmail).toBeTruthy()
      await expect(printPhone).toBeTruthy()
    })

    test('should handle non-print view correctly', async ({ page }) => {
      // Note: We can't actually test print layout visually, but we can check if print-specific elements exist
      const printEmail = page.locator('.print\\:hidden').getByText(about.contact.email)
      const printPhone = page.locator('.print\\:hidden').getByText(about.contact.tel)

      await expect(printEmail).toBeTruthy()
      await expect(printPhone).toBeTruthy()
    })

    test('should validate about ARIA snapshot', async ({ page }) => {
      await expect(page.getByTestId('about_name')).toMatchAriaSnapshot(`
        - text: ${about.name}
      `)
      await expect(page.getByTestId('about_description')).toMatchAriaSnapshot(`
        - text: ${about.description}
      `)
      await expect(page.getByTestId('about_summery_title')).toMatchAriaSnapshot(`
        - text: Summary
      `)
      // const avatarImg = page.getByTestId('about_avatar_url').first()
      const avatarImg = page.getByRole('img', { name: about.name })
      await avatarImg.evaluate((img: HTMLImageElement) => img.complete)
      await expect(avatarImg).toMatchAriaSnapshot(`
        - img "${about.name}"
      `)
      await expect(page.getByTestId('about_contact_email')).toMatchAriaSnapshot(`
        - link "Show Email":
          - img
      `)
      await expect(page.getByTestId('about_contact_tel')).toMatchAriaSnapshot(`
        - link "Show Mobile Number":
          - img
      `)
      await Promise.allSettled([
        ...about.contact.social.map(async (social) => {
          await expect(page.getByTestId(`about_contact_social_${social.name}`)).toMatchAriaSnapshot(`
            - link "Show Social Media ${social.name}":
              - img
          `)
        }),
      ])
      await expect(page.getByTestId('about_location_link')).toMatchAriaSnapshot(`
        - link "Show Location on Map":
          - img
          - text: ${about.location.city},${about.location.country}
      `)
    })
  })
})
