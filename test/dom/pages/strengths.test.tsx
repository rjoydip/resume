import { Strengths } from '@/pages/strengths'
import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { strengths as strengthsFixture } from '../../../fixtures/data'
import { TQProvider } from '../../_shared/test-provider'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: strengthsFixture,
    })),
  }
})

describe('<Strengths />', () => {
  beforeAll(async () => {
    render(
      <TQProvider>
        <Strengths />
      </TQProvider>,
    )
  })

  it('should validate strengths title', async () => {
    await waitFor(() => expect(screen.getByTestId('strengths_title').textContent?.toLowerCase()).toBe('strengths'))
  })

  it('should validate strengths list', async () => {
    await waitFor(() => {
      const title = screen.getByTestId('strengths_list')
      const { queryByText } = within(title)
      expect(title.children).toHaveLength(5)
      strengthsFixture.forEach(async (t) => {
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
        <Strengths />
      </TQProvider>,
    )

    expect(screen.getByTestId('strengths_skeleton')).toBeInTheDocument()
  })
})
