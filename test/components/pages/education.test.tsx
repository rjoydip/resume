import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getTestFixturesAsync } from 'test/test-utils'
import { Education } from '@/components/pages'
import type { EducationType } from '@/types'

describe('<Education />', () => {
  it('should validate education title', async () => {
    const education = await getTestFixturesAsync('education')
    await render(<Education data={education} />)
    const aboutNameEle = screen.getByTestId('education_title')
    expect(aboutNameEle.textContent).toBeDefined()
    expect(aboutNameEle.textContent).toBe('Education')
  })

  describe('should validate education items', async () => {
    const education: EducationType = await getTestFixturesAsync('education')
    education.forEach((ed, index: number) => {
      it('should validate school', () => {
        const aboutNameEle = screen.getByTestId(
          `education_school_index_${index}`,
        )
        expect(aboutNameEle.textContent).toBeDefined()
        expect(aboutNameEle.textContent).toBe(ed.school)
      })
      it('should validate tenure', () => {
        const aboutNameEle = screen.getByTestId(
          `education_start_end_index_${index}`,
        )
        expect(aboutNameEle.textContent).toBeDefined()
        expect(aboutNameEle.textContent).toBe(`${ed.start} - ${ed.end}`)
      })
      it('should validate degree', () => {
        const aboutNameEle = screen.getByTestId(
          `education_degree_index_${index}`,
        )
        expect(aboutNameEle.textContent).toBeDefined()
        expect(aboutNameEle.textContent).toBe(ed.degree)
      })
      it('should validate aggregate', () => {
        const aboutNameEle = screen.getByTestId(
          `education_aggregate_index_${index}`,
        )
        expect(aboutNameEle.textContent).toBeDefined()
        expect(aboutNameEle.textContent).toBe(
          `Aggregate: ${ed?.aggregate ?? ed?.cgpa}`,
        )
      })
    })
  })
})
