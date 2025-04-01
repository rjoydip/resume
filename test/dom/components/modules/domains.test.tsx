import Domains from '@/components/modules/domains'
import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TQProvider } from '../../../_shared/test-provider'
import { domains } from '../../../fixtures/data.fixture'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: domains,
    })),
  }
})

describe('<Strengths />', () => {
  beforeAll(async () => {
    render(
      <TQProvider>
        <Domains />
      </TQProvider>,
    )
  })

  it('should validate domains title', async () => {
    await waitFor(() => expect(screen.getByTestId('domains_title').textContent?.toLowerCase()).toBe('domains'))
  })

  it('should validate domains list', async () => {
    await waitFor(() => {
      const title = screen.getByTestId('domains_list')
      const { queryByText } = within(title)
      expect(title.children).toHaveLength(3)
      domains.forEach(async (t) => {
        await waitFor(() => expect(queryByText(t)?.textContent).toBeDefined())
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
        <Domains />
      </TQProvider>,
    )

    expect(screen.getByTestId('domains_skeleton')).toBeInTheDocument()
  })
})
