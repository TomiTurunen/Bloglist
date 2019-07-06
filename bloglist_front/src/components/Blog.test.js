import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'
jest.mock('../services/blogs')

afterEach(cleanup)

/*describe('<App />', () => {
	it('if user not logged, blogs not rendered', async () => {
		const component = render(
			<App />
		)
		component.render(<App />)

		await waitForElement(
			() => component.getAllByAltText('login')
		)
	})
})*/



it('renders content', () => {
	const blog = {
		title: 'Defence of Good',
		author: 'Thor',
		likes: 99,
		url: 'www.chaos.com'
	}

	const component = render(
		<Blog blog={blog} />
	)

	const { getByText } = component

	expect(component.container).toHaveTextContent(
		'Defence of Good'
	)
	expect(component.container).toHaveTextContent(
		'Thor'
	)
	expect(component.container).not.toHaveTextContent(
		99
	)
	expect(component.container).not.toHaveTextContent(
		'www.chaos.com'
	)
	const clickArea = getByText('Defence of Good Thor')
	fireEvent.click(clickArea)

	expect(component.container).toHaveTextContent(
		'Defence of Good'
	)
	expect(component.container).toHaveTextContent(
		'Thor'
	)
	expect(component.container).toHaveTextContent(
		99
	)
	expect(component.container).toHaveTextContent(
		'www.chaos.com'
	)

})