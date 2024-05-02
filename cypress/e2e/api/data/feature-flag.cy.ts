describe('should validate feature-flag routes', () => {
  it('should validate invalid feature-flag routes', () => {
    cy.request('/api/data/feature-flag/').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.not.empty
      expect(response.body).to.have.all.keys('FF_SHOW_PROFILE_IMAGE')
    })
  })
})
