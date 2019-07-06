

describe('Note app', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function () {
		cy.contains('blogs')
	})

	it('login form can be opened', function () {
		cy.contains('login')
			.click()
		cy.get('input[name="Username"]')
			.type('tomit')
		cy.get('input[name="Password"]')
			.type('qwerty')
		cy.contains('Kirjaudu')
			.click()
		cy.contains('Tervetuloa käyttämään blogilistaa, tomit')

	})
})