import React from 'react'
import { About } from '@/components/pages/about'
import type { AboutType } from '@/types'

describe('<About />', () => {
  before(function () {
    cy.fixture('about').then(
      (about: AboutType & { prof_summery_title: string }) => {
        this.about = about
        cy.mount(<About data={this.about} />)
      },
    )
  })
  it('should render and display expected content', function () {
    const {
      name,
      description,
      avatar_url,
      location_link,
      location,
      professional_summary,
      prof_summery_title,
      contact,
    }: AboutType & { prof_summery_title: string } = this.about
    const { email, tel, social } = contact
    cy.get('[data-cy="about_name"]').first().should('have.text', name)
    cy.get('[data-cy="about_description"]')
      .first()
      .should('have.text', description)
    cy.get('[data-cy="about_location"]').first().should('have.text', location)
    cy.get('[data-cy="about_prof_summery"]')
      .first()
      .should('have.text', professional_summary)
    cy.get('[data-cy="about_prof_summery_title"]')
      .first()
      .should('have.text', prof_summery_title)
    cy.get('[data-cy="about_avatar_url"]').should(
      'have.attr',
      'src',
      avatar_url,
    )
    cy.get('[data-cy="about_location_link"]').should(
      'have.attr',
      'href',
      location_link,
    )
    cy.get('[data-cy="about_contact_visible"]')
      .should('be.visible')
      .as('ContactVisible')
    cy.get('@ContactVisible').then(() => {
      cy.get('[data-cy="about_contact_email"').should(
        'have.attr',
        'href',
        `mailto:${email}`,
      )
      cy.get('[data-cy="about_contact_tel"').should(
        'have.attr',
        'href',
        `tel:${tel}`,
      )
      social.forEach((s) => {
        cy.get(`[data-cy="about_contact_social_${s.name}"`).should(
          'have.attr',
          'href',
          s.url,
        )
      })
    })
  })
})
