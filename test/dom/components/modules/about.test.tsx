import About from '@/components/modules/about'
import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TQProvider } from '../../../_shared/test-provider'
import { about } from '../../../fixtures/data.fixture'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: about,
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
    await waitFor(() => expect(screen.getByTestId('about_name')).toHaveTextContent(about.name))
  })

  it('should validate description', async () => {
    await waitFor(() => expect(screen.getByTestId('about_description')).toHaveTextContent(about.description))
  })

  it('should validate location', async () => {
    await waitFor(() => expect(screen.getByTestId('about_location')).toHaveTextContent(`${about.location.city},${about.location.country}`))
  })

  it('should validate professional summary', async () => {
    await waitFor(() => expect(screen.getByTestId('about_summery')).toHaveTextContent(about.summary))
  })

  it('should validate professional summary title', async () => {
    await waitFor(() => expect(screen.getByTestId('about_summery_title')).toBeDefined())
  })

  it('should validate location link', async () => {
    await waitFor(() => expect(screen.getByTestId('about_location_link')).toHaveAttribute('href', about.location.link))
  })

  it('should validate contact email', async () => {
    await waitFor(() => expect(screen.getByTestId('about_contact_email')).toHaveAttribute('href', `mailto:${about.contact.email}`))
  })

  it('should validate contact tel', async () => {
    await waitFor(() => expect(screen.getByTestId('about_contact_tel')).toHaveAttribute('href', `tel:${about.contact.tel}`))
  })

  it('should validate contact social', async () => {
    about.contact.social.forEach(async (s) => {
      await waitFor(() => expect(screen.getByTestId(`about_contact_social_${s.name}`)).toHaveAttribute('href', s.url))
    })
  })

  it('should render skeleton when data is pending', () => {
    vi.mocked(useSuspenseQuery).mockReturnValue({
      isPending: true,
      data: undefined,
      isError: false,
      error: null,
    } as any)

    render(
      <TQProvider>
        <About />
      </TQProvider>,
    )

    expect(screen.getByTestId('about_skeleton')).toBeInTheDocument()
  })
})
