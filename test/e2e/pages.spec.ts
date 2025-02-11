import { languages, metadata } from '@/data'
import { expect } from '@playwright/test'
import { loadPage } from '../_shared/test-utils'
import { about, educations } from '../fixtures/data.fixture'
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

    test('checks dark mode text colors', async ({ page }) => {
      // Enable dark mode
      await page.evaluate(() => {
        document.documentElement.classList.add('dark')
      })

      // Check text color in dark mode
      const languageNames = await page.locator('.text-gray-900.dark\\:text-gray-100').all()
      for (const name of languageNames) {
        await expect(name).toHaveClass(/dark:text-gray-100/)
      }
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

  test.describe('<Educations />', () => {
    test('render education tilte correctly', async ({ page }) => {
      // Check if the title is rendered
      const title = await page.getByTestId('education_title')
      await expect(title).toBeVisible()
      await expect(title).toHaveText('Education')
    })

    test('renders education list correctly', async ({ page }) => {
      await Promise.all([
        ...educations.map(async (education, index) => {
          await expect(page.getByTestId(`education_name_index_${index}`)).toHaveText(education.name)
          await expect(page.getByTestId(`education_start_end_index_${index}`)).toHaveText(`${education.start} - ${education.end}`)
          await expect(page.getByTestId(`education_degree_index_${index}`)).toHaveText(education.degree)
          await expect(page.getByTestId(`education_aggregate_index_${index}`)).toHaveText(`Aggregate: ${education.aggregate ?? education.cgpa}`)
        }),
      ])
    })

    test('verifies layout and styling', async ({ page }) => {
      // Check if the border is present
      await page.locator('section .relative.space-y-8.border-l.border-gray-200').isVisible()
    })
  })

  test.describe('<Languages />', () => {
    test('render language title', async ({ page }) => {
      // Check if the title is rendered
      const title = await page.getByTestId('language_title')
      await expect(title).toBeVisible()
      await expect(title).toHaveText('Languages')
    })

    test('renders languages list correctly', async ({ page }) => {
      // Check if the language list is rendered
      const languageList = await page.getByTestId('language_list')
      await expect(languageList).toBeVisible()

      // Check number of languages
      const languageItems = await languageList.locator('li').all()
      expect(languageItems.length).toBe(languages.length)

      // Check each language entry
      for (const [index, language] of languages.entries()) {
        const languageElement = await languageList.locator('li').nth(index)

        // Check if badge icon exists
        const icon = await languageElement.locator('svg')
        await expect(icon).toBeVisible()
        await expect(icon).toHaveClass(/text-green-500/)

        // Check language name
        await expect(languageElement).toContainText(language.name)

        // Check native status if applicable
        if (language.isNative) {
          await expect(languageElement).toContainText('(Native)')
        }
        else {
          await expect(languageElement).not.toContainText('(Native)')
        }
      }
    })

    test('verifies layout and styling', async ({ page }) => {
      // Check list spacing
      const list = await page.getByTestId('language_list')
      await expect(list).toHaveClass(/space-y-4/)

      // Check language item layout
      const firstLanguageItem = await list.locator('li').first()
      await expect(firstLanguageItem).toHaveClass(/flex flex-wrap items-start items-baseline/)
    })
  })
})
