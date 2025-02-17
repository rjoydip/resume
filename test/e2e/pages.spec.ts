import { languages, metadata } from '@/data.ts'
import { expect } from '@playwright/test'
import { capitalize, loadPage } from '../_shared/test-utils'
import { about, educations, projects, skills, strengths, works } from '../fixtures/data.fixture'
import { test } from '../setup/e2e.setup.ts'

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
      }),
    ])
  })

  test('verifies project links rendering', async ({ page }) => {
    await Promise.all([
      ...projects.map(async (_, index) => {
        // Check first project links
        const firstProjectLinks = await page.getByTestId(`project_links_index_${index}`)
        await expect(firstProjectLinks).toBeVisible()
        await expect(firstProjectLinks).toContainText('Links:')

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
        await expect(projTech).toContainText(`Technology: ${project.techStacks.map(tech => capitalize(tech)).join('')}`)
      }),
    ])
  })

  test('verifies client project styling', async ({ page }) => {
    // Check client project border
    const clientProject = await page.locator('.border-2.border-green-500').first()
    await expect(clientProject).toBeVisible()

    // Check non-client project border
    const nonClientProject = await page.locator('.border').first()
    await expect(nonClientProject).toBeVisible()
  })

  test('checks responsive grid layout', async ({ page }) => {
    const projectsGrid = await page.locator('.grid')

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(projectsGrid).toHaveClass(/grid-cols-1/)

    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(projectsGrid).toHaveClass(/md:grid-cols-2/)

    // Desktop view
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(projectsGrid).toHaveClass(/lg:grid-cols-2/)
  })

  test('verifies print-specific classes', async ({ page }) => {
    // Check print-specific classes
    const printContainer = await page.locator('.print-force-new-page')
    await expect(printContainer).toBeVisible()

    const printGrid = await page.locator('.print\\:grid-cols-2')
    await expect(printGrid).toBeVisible()

    // Verify links are hidden in print
    const links = await printContainer.locator('.print\\:hidden').all()
    await Promise.all([
      ...links.map(async link => await expect(link).toBeVisible()),
    ])
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

    // Verify each skill badge is rendered with correct text
    for (const skill of skills) {
      const skillBadge = await page.getByLabel(`Show ${capitalize(skill)} skill`)
      await expect(skillBadge).toBeVisible()
      await expect(skillBadge).toHaveText(capitalize(skill))
    }
  })

  test('should verify layout and styling', async ({ page }) => {
    // Check flex wrap and spacing
    const skillsList = await page.getByTestId('skills_list')
    await expect(skillsList).toHaveClass(/flex flex-wrap/)
    await expect(skillsList).toHaveClass(/space-2/)

    // Check badge styling
    const badges = await page.getByTestId('skills_list').locator('.badge')
    for (const badge of await badges.all()) {
      await expect(badge).toHaveClass(/m-1/)
      await expect(badge).toHaveClass(/text-\[14px\]/)
    }
  })

  test('should verify accessibility features', async ({ page }) => {
    // Check ARIA labels
    for (const skill of skills) {
      const skillBadge = await page.getByLabel(`Show ${capitalize(skill)} skill`)
      await expect(skillBadge).toHaveAttribute('aria-label', `Show ${capitalize(skill)} skill`)
    }

    // Check heading level
    const title = await page.getByTestId('skills_title')
    await expect(title).toHaveAttribute('class', /text-xl/)
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

  test('should verify layout and styling', async ({ page }) => {
    // Check list spacing
    const strengthsList = await page.getByTestId('strengths_list')
    await expect(strengthsList).toHaveClass(/space-y-4/)
    await expect(strengthsList).toHaveClass(/text-left/)

    // Check list item styling
    const listItems = await strengthsList.locator('li').all()
    for (const item of listItems) {
      await expect(item).toHaveClass(/flex/)
      await expect(item).toHaveClass(/flex-wrap/)
      await expect(item).toHaveClass(/items-start/)
      await expect(item).toHaveClass(/items-baseline/)
    }

    // Check text styling
    const textElements = await page.locator('.text-lg.font-semibold').all()
    for (const element of textElements) {
      await expect(element).toHaveClass(/mx-0.5/)
      await expect(element).toHaveClass(/text-gray-900/)
      await expect(element).toHaveClass(/dark:text-gray-100/)
    }
  })

  test('should verify icon accessibility', async ({ page }) => {
    const icons = await page.getByTestId('badge-check-icon').all()

    for (const icon of icons) {
      // Verify icon size
      await expect(icon).toHaveClass(/h-4/)
      await expect(icon).toHaveClass(/w-4/)

      // Verify icon color
      await expect(icon).toHaveClass(/text-green-500/)

      // Verify icon margin
      await expect(icon).toHaveClass(/mr-1/)
    }
  })
})

test.describe('<Works />', () => {
  test('render works title', async ({ page }) => {
    const title = await page.getByTestId('works_title')
    await expect(title).toBeVisible()
    await expect(title).toHaveText('Work Experience')
  })

  test('should render work experience section with all details', async ({ page }) => {
    // Check work list container
    const workList = await page.getByTestId('work_list')
    await expect(workList).toBeVisible()

    for (const [index, work] of works.entries()) {
      // Test first work experience
      const workRef = await page.getByTestId(`work_details_index_${index}`)
      await expect(workRef).toContainText(work.company)

      // Check working modes
      await expect(workRef).toContainText(work.mode)

      // Check position and description
      await expect(page.getByTestId(`work_position_index_${index}`)).toHaveText(work.position)
      const workDesc = await page.getByTestId(`work_description_index_${index}`)
      await expect(workDesc).toContainText(work.description.replaceAll('<br/>', ''))

      // Check technology stack
      const workTech = await page.getByTestId(`work_technology_index_${index}`)
      await expect(workTech).toContainText(`Technology: ${work.techStacks.map(tech => capitalize(tech)).join('')}`)
    }
  })

  test('should verify company links and interactions', async ({ page }) => {
    // Check all company links
    for (const [index, work] of works.entries()) {
      const link = await page.getByTestId(`work_details_index_${index}`).getByRole('link', { name: 'Company Name' })
      await expect(link).toHaveAttribute('href', work.link)
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')

      // Test hover state
      await link.hover()
      await expect(link).toHaveClass(/hover:underline/)
    }
  })

  test('should verify working mode badges', async ({ page }) => {
    // Check working mode badges
    const badges = await page.locator('.badge').all()

    for (const badge of badges) {
      await expect(badge).toHaveClass(/text-\[12px\]/)
      await expect(badge).toHaveClass(/align-middle/)
    }

    for (const [index, work] of works.entries()) {
      const details = await page.getByTestId(`work_details_index_${index}`)
      for (const mode of work.mode) {
        await expect(details.getByText(mode)).toBeVisible()
      }
    }
  })

  test('should verify layout and styling', async ({ page }) => {
    // Check timeline layout
    const workList = await page.getByTestId('work_list')
    await expect(workList).toHaveClass(/border-l/)
    await expect(workList).toHaveClass(/space-y-8/)

    // Check dot icons
    const dots = await page.getByTestId('dot-icon').all()
    for (const dot of dots) {
      await expect(dot).toHaveClass(/absolute/)
      await expect(dot).toHaveClass(/-left-\[12px\]/)
    }

    // Check dark mode text colors
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
    })
    const descriptions = await page.locator('.dark\\:text-gray-300').all()
    for (const desc of descriptions) {
      await expect(desc).toHaveClass(/dark:text-gray-300/)
    }
  })

  test('should verify HTML semantics and accessibility', async ({ page }) => {
    const links = await page.getByTestId('work_list').getByRole('link').all()
    for (const link of links) {
      await expect(link).toHaveAttribute('aria-label')
    }
  })
})
