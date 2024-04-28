import React from 'react'
import humanizeString from 'humanize-string'
import { Skills } from '@/components/pages/skills'
import type { SkillsType } from '@/types'

describe('<Skills />', () => {
  before(function () {
    cy.fixture('skills').then((skills: SkillsType) => {
      this.skills = skills
      cy.mount(<Skills data={this.skills} />)
    })
  })
  it('should render and display expected content', function () {
    const skills: SkillsType = this.skills
    cy.get('[data-cy="skills_title"]').first().should('have.text', 'Skills')
    cy.get('[data-cy="skills_list"]').find('li').its('length').should('eq', 11)
    Object.keys(skills).forEach((key, index) => {
      cy.get(
        `[data-cy="skills_list"] > li:nth-child(${index + 1}) > div > p`,
      ).should('have.text', `${humanizeString(key)}:`)
      cy.get(`[data-cy="skills_list"] > li:nth-child(${index + 1}) > div`)
        .find('span')
        .its('length')
        .should('gt', 0)
    })
  })
})
