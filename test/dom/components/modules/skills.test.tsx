import Skills from '@/components/modules/skills'
import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TQProvider } from '../../../_shared/test-provider'
import { skills } from '../../../fixtures/data.fixture'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: skills,
    })),
  }
})

describe('<Skills />', () => {
  let container: HTMLElement
  beforeAll(() => {
    const render$ = render(
      <TQProvider>
        <Skills />
      </TQProvider>,
    )
    container = render$.container
  })

  it('should validate skill title', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('skills_title').textContent?.toLowerCase()).toBe('skills')
    })
  })

  it('should validate skill', async () => {
    await waitFor(() => {
      expect(
        container.querySelector('[data-testid=\'skills_list\'] > div'),
      ).toBeDefined()
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
        <Skills />
      </TQProvider>,
    )

    expect(screen.getByTestId('skills_skeleton')).toBeInTheDocument()
  })
})
