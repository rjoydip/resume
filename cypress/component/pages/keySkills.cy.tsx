import React from 'react'
import { KeySkills } from '@/components/pages/keySkills'
import type { KeySkillsType } from '@/types'

describe('<KeySkills />', () => {
  before(function () {
    cy.fixture('key_skills').then((keySkills: KeySkillsType[]) => {
      this.keySkills = keySkills
      cy.mount(<KeySkills data={this.keySkills} />)
    })
  })
  it('should render and display expected content', function () {
    const keySkills: KeySkillsType = this.keySkills
    cy.get('[data-cy="key_skills_title"]')
      .first()
      .should('have.text', 'Key Skills')
    cy.get('[data-cy="key_skills_list"]')
      .find('li')
      .its('length')
      .should('eq', 7)
    keySkills.forEach((sk, index) => {
      cy.get(`[data-cy="key_skills_list"] > li:nth-child(${index + 1}) > div`).should('have.text', sk)
    })
  })
})
