import Languages from '@/components/modules/languages'
import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TQProvider } from '../../../_shared/test-provider'
import { languages } from '../../../fixtures/data.fixture'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: languages,
    })),
  }
})

describe('<Languages />', () => {
  beforeAll(async () => {
    render(
      <TQProvider>
        <Languages />
      </TQProvider>,
    )
  })

  it('should validate language_title', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('language_title').textContent?.toLowerCase()).toBe('languages')
    })
  })

  it('should validate language list', async () => {
    await waitFor(() => {
      const title = screen.getByTestId('language_list')
      const { queryByText } = within(title)
      expect(title.children).toHaveLength(2)
      languages.forEach(async (t) => {
        await waitFor(() => {
          expect(queryByText(t.name)?.textContent).toBeDefined()
        })
      })
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
        <Languages />
      </TQProvider>,
    )

    expect(screen.getByTestId('languages_skeleton')).toBeInTheDocument()
  })
})
