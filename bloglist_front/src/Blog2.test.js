import React from 'react'
import {
	render, waitForElement, cleanup
} from '@testing-library/react'
import 'jest-dom/extend-expect'
jest.mock('./services/blogs')
import App from './App'
afterEach(cleanup)

describe('<App />', () => {
	it('renders blogs from backend', async () => {
		const component = render(
			<App />
		)

		component.rerender(<App />)
		await waitForElement(
			() => component.getByText('Log in to application')
		)

		const blogs = component.container.querySelectorAll('.blog')
		expect(blogs.length).toBe(0)

	})
	it('renders blogs from backend', async () => {
		const user = {
			username: 'tomit',
			token: '1231231214',
			name: 'Tomi Turunen'
		}

		localStorage.setItem('loggedBlogger', JSON.stringify(user))
		const component = render(
			<App />
		)

		component.rerender(<App />)
		await waitForElement(
			() => component.getByText('Tomi Turunen logged in')
		)
		const blogs = component.container.querySelectorAll('.blog')
		expect(blogs.length).toBe(4)
		expect(component.container).toHaveTextContent('Title minä')
		expect(component.container).toHaveTextContent('Rise UKK')
		expect(component.container).toHaveTextContent('Forever Mäkelä')
		expect(component.container).toHaveTextContent('Free Tomi Turunen')

	})

})