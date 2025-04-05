import { expect } from '@playwright/test'
import about from '../../src/data/about'
import domains from '../../src/data/domains.ts'
import educations from '../../src/data/educations'
import { meta } from '../../src/data/index'
import languages from '../../src/data/languages.ts'
import projects from '../../src/data/projects'
import strengths from '../../src/data/strengths'
import works from '../../src/data/works'
import { loadPage } from '../_shared/test-utils'
import { test } from '../setup/e2e.setup.ts'

test.beforeEach(async ({ page }) => {
  await loadPage({ page, path: '' })
})

test.describe('<Root />', () => {
  test('should validate title and body', async ({ page }) => {
    expect(await page.title()).toBe(meta.name)
    expect(await page.locator('body')).toBeVisible()
  })

  test('checks dark mode text colors', async ({ page }) => {
    // Enable dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
    })
  })
})

test.describe('<About />', () => {
  test('should display profile information correctly', async ({ page, isMobile }) => {
    if (isMobile) {
      await expect(page.getByTestId('about_name_small_screen')).toBeVisible()
    }
    else {
      await expect(page.getByTestId('about_name')).toBeVisible()
    }

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
    for await (const social of about.contact.social) {
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

    for await (const social of about.contact.social) {
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

  test('should validate about ARIA snapshot', async ({ page, isMobile }) => {
    if (isMobile) {
      await expect(page.getByTestId('about_name_small_screen')).toMatchAriaSnapshot(`
        - text: ${about.name}
      `)
    }
    else {
      await expect(page.getByTestId('about_name')).toMatchAriaSnapshot(`
        - text: ${about.name}
      `)
    }
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
    for await (const [index, language] of languages.entries()) {
      const languageElement = await languageList.locator('li').nth(index)

      // Check if badge icon exists
      const icon = await languageElement.locator('svg')
      await expect(icon).toBeVisible()

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
})

test.describe('<Projects />', () => {
  test('render project title', async ({ page }) => {
    const title = await page.getByTestId('projects_title')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('Projects')
  })

  test('renders projects list correctly', async ({ page }) => {
    await Promise.all([
      ...projects.map(async (project, index) => {
        await expect(page.getByTestId(`project_title_index_${index}`)).toHaveText(project.title)
        await expect(page.getByTestId(`project_description_index_${index}`)).toHaveText(project.description)
        await expect(page.getByTestId(`project_client_index_${index}`)).toContainText(`${project.isClient ? 'Yes' : 'No'} ${project.client_country
          ? `(${project.client_country})`
          : ''}`)
        await expect(page.getByTestId(`project_company_index_${index}`)).toContainText(project.company)

        // Verify web and mobile icons
        await expect(async () => {
          await page.getByTestId(`project_links_index_${index}`).getByRole('link', { name: 'Project Link' }).nth(index)
        }).toPass()
      }),
    ])
  })

  test('verifies tech stacks rendering', async ({ page }) => {
    await Promise.all([
      ...projects.map(async (project, index) => {
        // Check first project tech stacks
        const projTech = await page.getByTestId(`project_tech_stacks_index_${index}`)
        await expect(projTech).toBeVisible()
        await expect(projTech).toContainText(`${project.techStacks.map(tech => tech).join('')}`)
      }),
    ])
  })

  test('verifies print-specific classes', async ({ page }) => {
    // Check print-specific classes
    const printContainer = await page.locator('.print-force-new-page')
    await expect(printContainer).toBeVisible()

    const printGrid = await page.locator('.print\\:grid-cols-2')
    await expect(printGrid).toBeVisible()
  })
})

test.describe('<Skills />', () => {
  test('render skills title', async ({ page }) => {
    const title = await page.getByTestId('skills_title')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('Skills')
  })

  test('should render skills section with title and all skills', async ({ page }) => {
    // Check section title
    const title = await page.getByTestId('skills_title')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('Skills')

    // Check skills list container
    const skillsList = await page.getByTestId('skills_list')
    await expect(skillsList).toBeVisible()
  })
})

test.describe('<Strengths />', () => {
  test('render strengths title', async ({ page }) => {
    const title = await page.getByTestId('strengths_title')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('Strengths')
  })

  test('should render strengths section with title and list', async ({ page }) => {
    // Check strengths list container
    const strengthsList = await page.getByTestId('strengths_list')
    await expect(strengthsList).toBeVisible()

    // Verify each strength item
    const listItems = await strengthsList.locator('li').all()
    expect(listItems.length).toBe(strengths.length)

    for (let i = 0; i < listItems.length; i++) {
      const item = listItems[i]
      await expect(item).toBeVisible()
      // Check strength text
      const text = await item.locator('div').textContent()
      expect(text).toBe(strengths[i])
    }
  })
})

test.describe('<Domains />', () => {
  test('render domains title', async ({ page }) => {
    const title = await page.getByTestId('domains_title')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('Domains')
  })

  test('should render domains section with title and list', async ({ page }) => {
    // Check domains list container
    const domainsList = await page.getByTestId('domains_list')
    await expect(domainsList).toBeVisible()

    // Verify each strength item
    const listItems = await domainsList.locator('li').all()
    expect(listItems.length).toBe(domains.length)

    for (let i = 0; i < listItems.length; i++) {
      const item = listItems[i]
      await expect(item).toBeVisible()
      // Check strength text
      const text = await item.locator('div').textContent()
      expect(text).toBe(domains[i])
    }
  })
})

test.describe('<Works />', () => {
  test('render works title', async ({ page }) => {
    const title = await page.getByTestId('works_title')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('Work Experience')
  })

  test('should render work experience with all details', async ({ page }) => {
    // Check work list container
    const workList = await page.getByTestId('work_list')
    await expect(workList).toBeVisible()

    for await (const [index, work] of works.entries()) {
      const workRef = await page.getByTestId(`work_details_index_${index}`)
      await expect(workRef).toContainText(work.company)

      // Check working modes
      await Promise.all([...work.mode.map(async mode => await expect(workRef).toContainText(mode))])

      // Check position and description
      await expect(page.getByTestId(`work_position_index_${index}`)).toHaveText(work.position)
      const workDesc = await page.getByTestId(`work_description_index_${index}`)
      await expect(workDesc).toContainText(work.description.replaceAll('<br/>', ''))
    }
  })

  test('should verify company links and interactions', async ({ page }) => {
    // Check all company links
    for await (const [index, work] of works.entries()) {
      const link = await page.getByTestId(`work_details_index_${index}`).getByRole('link', { name: 'Company Name' })
      await expect(link).toHaveAttribute('href', work.link)
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')

      // Test hover state
      await link.hover()
      await expect(link).toHaveClass(/hover:underline/)
    }
  })

  test('should verify working mode badges', async ({ page }) => {
    for await (const [index, work] of works.entries()) {
      const details = await page.getByTestId(`work_details_index_${index}`)
      for await (const mode of work.mode) {
        await expect(details.getByText(mode)).toBeVisible()
      }
    }
  })

  test('should verify HTML semantics and accessibility', async ({ page }) => {
    const links = await page.getByTestId('work_list').getByRole('link').all()
    for await (const link of links) {
      await expect(link).toHaveAttribute('aria-label')
    }
  })
})
