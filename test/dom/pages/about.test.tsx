import { About } from '@/pages/about'
import { render, screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { about as aboutFixture } from '../../../fixtures/data'
import { TQProvider } from '../../_shared/test-provider'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: aboutFixture,
    })),
  }
})

describe('<About />', () => {
  beforeAll(() => {
    render(
      <TQProvider>
        <About />
      </TQProvider>,
    )
  })

  it('should validate name', async () => {
    await waitFor(() => expect(screen.getByTestId('about_name')).toHaveTextContent(aboutFixture.name))
  })

  it('should validate description', async () => {
    await waitFor(() => expect(screen.getByTestId('about_description')).toHaveTextContent(aboutFixture.description))
  })

  it('should validate location', async () => {
    await waitFor(() => expect(screen.getByTestId('about_location')).toHaveTextContent(`${aboutFixture.location.city},${aboutFixture.location.country}`))
  })

  it('should validate professional summary', async () => {
    await waitFor(() => expect(screen.getByTestId('about_summery')).toHaveTextContent(aboutFixture.summary))
  })

  it('should validate professional summary title', async () => {
    await waitFor(() => expect(screen.getByTestId('about_summery_title')).toBeDefined())
  })

  it('should validate location link', async () => {
    await waitFor(() => expect(screen.getByTestId('about_location_link')).toHaveAttribute('href', aboutFixture.location.link))
  })

  it('should validate contact email', async () => {
    await waitFor(() => expect(screen.getByTestId('about_contact_email')).toHaveAttribute('href', `mailto:${aboutFixture.contact.email}`))
  })

  it('should validate contact tel', async () => {
    await waitFor(() => expect(screen.getByTestId('about_contact_tel')).toHaveAttribute('href', `tel:${aboutFixture.contact.tel}`))
  })

  it('should validate contact social', async () => {
    aboutFixture.contact.social.forEach(async (s) => {
      await waitFor(() => expect(screen.getByTestId(`about_contact_social_${s.name}`)).toHaveAttribute('href', s.url))
    })
  })
})
