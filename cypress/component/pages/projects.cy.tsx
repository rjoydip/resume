import React from 'react'
import { Projects } from '@/components/pages/projects'
import type { ProjectType } from '@/types'

describe('<Projects />', () => {
  before(function () {
    cy.fixture('projects').then((projects: ProjectType[]) => {
      this.projects = projects
      cy.mount(<Projects data={this.projects} />)
    })
  })
  it('should render and display expected content', function () {
    const projects: ProjectType = this.projects
    cy.get('[data-cy="project_title"]').first().should('have.text', 'Projects')
    projects.forEach((p, index) => {
      cy.get(`[data-cy="project_title_index_${index}"]`)
        .first()
        .should('have.text', p.title)
      cy.get(`[data-cy="project_description_index_${index}"]`)
        .first()
        .should('have.text', p.description)
      cy.get(`[data-cy="project_client_index_${index}"]`).as('ClientContainer')
      if (p.isClient) {
        cy.get('@ClientContainer')
          .find('label')
          .should('have.text', 'Client: ')
        cy.get('@ClientContainer')
          .find('div')
          .should(
            'have.text',
            `${p.isClient ? 'Yes' : 'No'} ${
              p.client_country ? `(${p.client_country})` : ''
            }`,
          )
      }
      cy.get(`[data-cy="project_client_index_${index}"]`).as('ClientContainer')
      if (p.links && !!p.links.length) {
        cy.get('@ClientContainer')
          .find('a')
          .its('length')
          .should('eq', p.links ? p.links.length : 0)
        cy.get('@ClientContainer').find('label').should('have.text', 'Links: ')
      }
      cy.get(`[data-cy="project_company_index_${index}"]`)
        .find('label')
        .should('have.text', 'Company: ')
      cy.get(`[data-cy="project_company_index_${index}"]`)
        .find('div')
        .should('have.text', p.company)
      if (p.techStacks && !!p.techStacks.length) {
        cy.get(`[data-cy="project_tech_stacks_index_${index}"]`)
          .find('label')
          .should('have.text', 'Technology: ')
        cy.get(`[data-cy="project_tech_stacks_index_${index}"]`)
          .find('>div')
          .its('length')
          .should('eq', p.techStacks ? p.techStacks.length : 0)
      }
    })
  })
})
