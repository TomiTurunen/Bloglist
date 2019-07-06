import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

it('clicking the button calls event handler once', async () => {
	const blog = {
		title: 'Dragon',
		author: 'koivisto',
		likes: 101
	}
	const mockHandler = jest.fn()

	const { getByText } = render(
		<SimpleBlog blog={blog} onClick={mockHandler} />
	)

	const button = getByText('like')
	fireEvent.click(button)
	fireEvent.click(button)
	expect(mockHandler.mock.calls.length).toBe(2)
})

test('renders content', () => {
	const simpleBlog = {
		title: 'Dynamite',
		author: 'ukk',
		likes: 99
	}

	const component = render(
		<SimpleBlog blog={simpleBlog} />
	)

	expect(component.container).toHaveTextContent(
		'Dynamite'
	)
	expect(component.container).toHaveTextContent(
		'ukk'
	)
	expect(component.container).toHaveTextContent(
		99
	)
})