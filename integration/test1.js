
describe("User Login and checkout products", function () {


    it('User Login, Add BackPack and Checkout ', function () {
        //Login to SauceDemo
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test=username').type('performance_glitch_user')
        cy.get('[data-test=password]').type('secret_sauce')
        cy.get('[data-test=login-button]').click()
        cy.get('span.title').should(($el) => { expect($el).to.have.text('Products') })
        // cy.contains('Product').should('be.visible')

        var itemName = ''
        var itemPrice = 0
        //Get Name and Price of 1st item
        cy.get('.inventory_item_name').first().then(($el) => {
            itemName = $el.text()
        })
        cy.get('.inventory_item_price').first().then(($el) => {
            itemPrice = $el.text()
        })



        //Add BackPack to Cart and verify Number in Cart
        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click()
        cy.get('.shopping_cart_badge').should(($el) => { expect($el).to.have.text('1') })



        //Go to Cart and verify number of items in cart and Name of item, and Chekout
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').should(($el) => { expect($el).to.have.length(1) })
        cy.get('.inventory_item_name').should(($el) => { expect($el).to.have.text(itemName) })
        cy.get('[data-test=checkout]').click()



        //Enter User Details and Continue
        cy.get('[data-test=firstName]').type('User Fname')
        cy.get('[data-test=lastName]').type('User Lname')
        cy.get('[data-test=postalCode]').type('12345')
        cy.get('[data-test=continue]').click()



        //Verify item, name and price of item in Inventory Page
        cy.get('.inventory_item_name').should(($el) => { expect($el).to.have.length(1) })
        cy.get('.inventory_item_name').should(($el) => { expect($el).to.have.text(itemName) })
        cy.get('.inventory_item_price').should(($el) => { expect($el).to.have.text(itemPrice) })



        //Verify details in Order Summary and finish
        cy.get('.summary_subtotal_label').should(($el) => { expect($el).to.have.text('Item total: ' + itemPrice) })
        cy.get('.summary_tax_label').should(($el) => { expect($el).to.have.text('Tax: $2.40') })
        cy.get('.summary_total_label').should(($el) => { expect($el).to.have.text('Total: $32.39') })
        cy.get('[data-test=finish]').click()

        // Verify Success message
        cy.get('.complete-header').should(($el) => { expect($el).to.have.text('THANK YOU FOR YOUR ORDER') })
        cy.get('.complete-text').should(($el) => { expect($el).to.have.text('Your order has been dispatched, and will arrive just as fast as the pony can get there!') })



    })
})
