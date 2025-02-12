import Works from '@/components/pages/works'
import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TQProvider } from '../../../_shared/test-provider'
import { works as workFixture } from '../../../fixtures/data.fixture'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: workFixture,
    })),
  }
})

describe('<Works />', () => {
  let container: HTMLElement
  beforeAll(() => {
    const render$ = render(
      <TQProvider>
        <Works />
      </TQProvider>,
    )
    container = render$.container
  })

  it('should validate work title', async () => {
    await waitFor(() => expect(screen.getByTestId('works_title').textContent?.toLowerCase()).toBe('work experience'))
  })

  it('should validate work list', async () => {
    await waitFor(() => expect(
      container.querySelector('[data-testid="work_list"] > div'),
    ).toBeDefined())
  })

  describe('should validate work details', async () => {
    workFixture.forEach((w, index) => {
      it('should validate company link', async () => {
        await waitFor(() => expect(
          container.querySelector(
            `[data-testid="work_details_index_${index}"] > a`,
          ),
        ).toBeDefined())
        await waitFor(() => expect(
          container
            .querySelector(
              `[data-testid="work_details_index_${index}"] > div > a`,
            )
            ?.getAttribute('href'),
        ).toBe(w.link))
      })
      it('should validate company name', async () => {
        await waitFor(() => expect(container.querySelector(
          `[data-testid="work_details_index_${index}"] > div > a`,
        )?.textContent).toBe(w.company))
      })
      it('should validate working mode', async () => {
        await waitFor(() => expect(container.querySelector(
          `[data-testid="work_details_index_${index}"] > div > span`,
        )?.textContent).toBe(w.mode.join('')))
      })
      it('should validate working tenure', async () => {
        await waitFor(() => expect(container.querySelector(
          `[data-testid="work_details_index_${index}"] > div:nth-child(2)`,
        )?.textContent).toBe(`${w.start} - ${w.end ?? 'Present'}`))
      })
      it('should validate working position', async () => {
        await waitFor(() => expect(container.querySelector(
          `[data-testid="work_description_index_${index}"]`,
        )?.textContent).toBe(w.description.replaceAll('<br/>', '')))
      })
      it('should validate technology title', async () => {
        await waitFor(() => expect(container.querySelector(
          `[data-testid="work_technology_index_${index}"] > div:nth-child(1)`,
        )?.textContent).toBe('Technology: '))
      })
      it('should validate technology items', () => {
        w.techStacks
        && w.techStacks.forEach(async (_, i) => {
          await waitFor(() => expect(container.querySelector(
            `[data-testid="work_technology_index_${index}"] > div:nth-child(${i + 2})`,
          )?.textContent).toBeDefined())
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
        <Works />
      </TQProvider>,
    )

    expect(screen.getByTestId('works_skeleton')).toBeInTheDocument()
  })
})
