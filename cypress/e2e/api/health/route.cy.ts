describe('should validate health routes', () => {
  it('should validate invalid routes', () => {
    cy.visit('/api/hello/', { failOnStatusCode: false })
    cy.get('h1').should('have.text', '404')
    cy.get('h2').should('have.text', 'This page could not be found.')
  })
  it('should validate invalid health routes', () => {
    cy.request('/api/health/').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.not.empty
      expect(response.body.status).to.be.eq('up')
    })
  })
})
