import React from 'react'
import { Education } from '@/components/pages/education'
import type { EducationType } from '@/types'

describe('<Education />', () => {
  before(function () {
    cy.fixture('education').then((education: EducationType) => {
      this.education = education
      cy.mount(<Education data={this.education} />)
    })
  })
  it('should render and display expected content', function () {
    const education: EducationType = this.education
    cy.get('[data-cy="education_title"]')
      .first()
      .should('have.text', 'Education')
    education.forEach((ed, index: number) => {
      cy.get(`[data-cy="education_school_index_${index}"]`)
        .first()
        .should('have.text', ed.school)
      cy.get(`[data-cy="education_start_end_index_${index}"]`)
        .first()
        .should('have.text', `${ed.start} - ${ed.end}`)
      cy.get(`[data-cy="education_degree_index_${index}"]`)
        .first()
        .should('have.text', ed.degree)
      cy.get(`[data-cy="education_aggregate_index_${index}"]`)
        .first()
        .should('have.text', `Aggregate: ${ed?.aggregate ?? ed?.cgpa}`)
    })
  })
})
