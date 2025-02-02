import Educations from '@/pages/educations'
import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { educations as educationsFixtures } from '../../../fixtures/data'
import { TQProvider } from '../../_shared/test-provider'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: educationsFixtures,
    })),
  }
})

describe('<Educations />', () => {
  beforeAll(() => {
    render(
      <TQProvider>
        <Educations />
      </TQProvider>,
    )
  })
  it('should validate education title', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('education_title').textContent?.toLowerCase()).toBe('education')
    })
  })

  describe('should validate education items', async () => {
    educationsFixtures.forEach((ed, index: number) => {
      it('should validate school or college', async () => {
        await waitFor(() => {
          const ele = screen.getByTestId(
            `education_name_index_${index}`,
          )
          expect(ele.textContent).toBeDefined()
          expect(ele.textContent).toBe(ed.name)
        })
      })
      it('should validate tenure', async () => {
        await waitFor(() => {
          const ele = screen.getByTestId(
            `education_start_end_index_${index}`,
          )
          expect(ele.textContent).toBeDefined()
          expect(ele.textContent).toBe(`${ed.start} - ${ed.end}`)
        })
      })
      it('should validate degree', async () => {
        await waitFor(() => {
          const ele = screen.getByTestId(
            `education_degree_index_${index}`,
          )
          expect(ele.textContent).toBeDefined()
          expect(ele.textContent).toBe(ed.degree)
        })
      })
      it('should validate aggregate', async () => {
        await waitFor(() => {
          const ele = screen.getByTestId(
            `education_aggregate_index_${index}`,
          )
          expect(ele.textContent).toBeDefined()
          expect(ele.textContent).toBe(
            `Aggregate: ${ed?.aggregate ?? ed?.cgpa}`,
          )
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
        <Educations />
      </TQProvider>,
    )

    expect(screen.getByTestId('educations_skeleton')).toBeInTheDocument()
  })
})
