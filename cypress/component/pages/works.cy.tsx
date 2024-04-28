import React from 'react'
import { Works } from '@/components/pages/works'
import type { WorksType } from '@/types'

describe('<Works />', () => {
  before(function () {
    cy.fixture('works').then((works: WorksType) => {
      this.works = works
      cy.mount(<Works data={this.works} />)
    })
  })
  it('should render and display expected content', function () {
    const works: WorksType = this.works
    cy.get('[data-cy="work_title"]')
      .first()
      .should('have.text', 'Work Experience')
    cy.get('[data-cy="work_list"]')
      .find('>div')
      .its('length')
      .should('eq', works.length)
    works.forEach((w, index) => {
      cy.get(`[data-cy="work_details_index_${index}"]`).as('WorkDetails')
      cy.get('@WorkDetails').find('>div>a').should('have.attr', 'href', w.link)
      cy.get('@WorkDetails')
        .find('>div>span')
        .find('div')
        .its('length')
        .should('eq', w.mode.length)
      cy.get('@WorkDetails')
        .find('>div>span')
        .find('div')
        .each(($el, idx) => {
          cy.wrap($el).should('have.text', w.mode[idx])
        })
      cy.get('@WorkDetails')
        .find(`>div:nth-child(2)`)
        .should('have.text', `${w.start} - ${w.end ?? 'Present'}`)
      cy.get(`[data-cy="work_position_index_${index}"]`).should(
        'have.text',
        w.position,
      )
      cy.get(`[data-cy="work_description_index_${index}"]`).should(
        'have.text',
        w.description,
      )
      cy.get(`[data-cy="work_skills_index_${index}"] > div`).should(
        'have.text',
        'Skills: ',
      )
      cy.get(`[data-cy="work_skills_index_${index}"]`)
        .find('span')
        .its('length')
        .should('eq', w.techStacks.length)
    })
  })
})
