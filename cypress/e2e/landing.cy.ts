import { AboutType } from "@/types"

describe('resume spec', () => {
  before('landing', () => { })
  beforeEach(() => {
    cy.intercept('/').as('landingURL')
    cy.visit('/')
    cy.window().then(w => w.beforeReload = true);
  })

  it('should load', () => {
    cy.wait('@landingURL')
    cy.window().should('have.prop', 'beforeReload', true)
    cy.url().should('contain', 'localhost')
    cy.title().should('eq', 'Joydip Roy')
  })

  it('should load body', () => {
    cy.wait('@landingURL')
    cy.get('body')
  })

  it('should match total sections', () => {
    cy.wait('@landingURL')
    cy.get('body')
    cy.get('section').should('have.length', 9)
  })

  it('should render about information', () => {
    cy.wait('@landingURL')
    cy.get('body')
    cy.fixture('about.json').then((about: AboutType & { prof_summery_title: string }) => {
      const { name, description, avatar_url, initials, location_link, location, professional_summary, prof_summery_title } = about;
      cy.get('[data-cy="about_name"]').first().should('have.text', name)
      cy.get('[data-cy="about_description"]').first().should('have.text', description)
      cy.get('[data-cy="about_initials"]').first().should('have.text', initials)
      cy.get('[data-cy="about_location"]').first().should('have.text', location)
      cy.get('[data-cy="about_prof_summery"]').first().should('have.text', professional_summary)
      cy.get('[data-cy="about_prof_summery_title"]').first().should('have.text', prof_summery_title)
      cy.get('[data-cy="about_avatar_url"]').should('have.attr', "src", avatar_url)
      cy.get('[data-cy="about_location_link"]').should('have.attr', "href", location_link)
    })
  })
})