import Declaration from '@/components/declaration'
import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TQProvider } from '../../_shared/test-provider'
import { today } from '../../_shared/test-utils'
import { country, declarations, location, name } from '../../fixtures/data.fixture'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: declarations,
    })),
  }
})

describe('<Declaration />', () => {
  beforeAll(async () => {
    render(
      <TQProvider>
        <Declaration />
      </TQProvider>,
    )
  })

  it('should validate declaration title', async () => {
    await waitFor(() => expect(screen.getByTestId('declaration_title').textContent?.toLowerCase()).toBe('declaration'))
  })

  it('should validate declaration text', async () => {
    await waitFor(() => expect(screen.getByTestId('declaration_text').textContent).toBeDefined())
  })

  it('should validate declaration details', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('declaration_location').textContent).toBe(`Location: ${location},${country}`)
      expect(screen.getByTestId('declaration_date').textContent).toBe(`Date: ${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`)
      expect(screen.getByTestId('declaration_name').textContent).toBe(`Name: ${name}`)
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
        <Declaration />
      </TQProvider>,
    )

    expect(screen.getByTestId('declaration_skeleton')).toBeInTheDocument()
  })
})
