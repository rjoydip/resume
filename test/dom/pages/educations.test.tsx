import type { EducationsType } from '@/types'
import { Educations } from '@/components/pages/educations'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { educations as educationsFixtures } from '../../../fixtures/data'

describe('<Educations />', () => {
  it('should validate education title', async () => {
    const educations = educationsFixtures
    await render(<Educations data={educations} />)
    const aboutNameEle = screen.getByTestId('education_title')
    expect(aboutNameEle.textContent).toBeDefined()
    expect(aboutNameEle.textContent?.toLowerCase()).toBe('education')
  })

  describe('should validate education items', async () => {
    const education: EducationsType = educationsFixtures
    education.forEach((ed, index: number) => {
      it('should validate school or college', () => {
        const aboutNameEle = screen.getByTestId(
          `education_name_index_${index}`,
        )
        expect(aboutNameEle.textContent).toBeDefined()
        expect(aboutNameEle.textContent).toBe(ed.name)
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
