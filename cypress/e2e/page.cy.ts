describe('Resume app', () => {
  beforeEach(() => {
    cy.intercept('/').as('appURL')
    cy.visit('/')
  })

  it('should load', () => {
    cy.wait('@appURL').its('response.statusCode').should('eq', 200)
    cy.window().then(w => w.beforeReload = true)
    cy.window().should('have.prop', 'beforeReload', true)
    cy.url().should('contain', 'localhost')
    cy.title().should('eq', 'Joydip Roy')
    cy.get('body')
  })

  it('should match total sections', () => {
    cy.wait('@appURL').its('response.statusCode').should('eq', 200)
    cy.get('section').should('have.length', 9)
  })
})
