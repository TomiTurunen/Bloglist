describe('Note app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testrouter/reset')
		const user = {
			name: 'Tomi Turunen',
			username: 'tomit',
			password: 'qwerty',
			likes: 111
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)


		const blog = {
			title: 'Kivi ja kallio',
			author: 'Zen Cafe',
			url: 'www.yle.fi/urheilu',
			likes: 1111
		}
		cy.request('GET', 'http://localhost:3003/api/blogs', blog)
		cy.request('POST', 'http://localhost:3003/api/blogs', blog)

		cy.visit('http://localhost:3000')
		cy.contains('login')
			.click()
		cy.get('input[name="Username"]')
			.type('tomit')
		cy.get('input[name="Password"]')
			.type('qwerty')
		cy.contains('Kirjaudu')
			.click()
	})

	it('create blog', function () {
		cy.get('input[name="Title"]')
			.type('Aava ja Rannikko')
		cy.get('input[name="Author"]')
			.type('Zen Cafe')
		cy.get('input[name="Url"]')
			.type('www.yle.fi/uutiset')
		cy.contains('Create')
			.click()
		cy.contains('Blogi Aava ja Rannikko luotu onnistuneesti!')
	})

	it('test navigate to blog', function () {
		cy.get('.navbar-toggler')
			.click()
		cy.get('a').contains('blogs')
			.click()
		cy.contains('Kivi ja kallio Zen Cafe')
			.click()
		cy.contains('www.yle.fi/urheilu ')
		cy.contains('111 likes')
		cy.contains('added by unknown')
		cy.get('input[name="Content"]')
			.type('Best ever, lol!')
		cy.contains('add comment')
			.click()
		cy.get('li').contains('Best ever, lol!')
			.click()
	})
})