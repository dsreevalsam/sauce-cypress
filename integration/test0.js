
// Login with all users and Check whether login was successful.
// Login in success if Products page is loaded within 4 seconds.

import user from '../fixtures/credentials.json'


describe('Login Validation', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    });

    user.forEach((user) => {
        it('Login with User: ' + user.username, function () {

            cy.get('[data-test=username').type(user.username)
            cy.get('[data-test=password]').type(user.password)
            cy.get('[data-test=login-button]').click()
            cy.url({ timeout: 1000 }).should('include', 'inventory')
            cy.contains('Product', { timeout: 100 }).should('be.visible')
            cy.get('span.title').should(($el) => {
                expect($el).to.have.text('Products')
            })
        })
    })
})
