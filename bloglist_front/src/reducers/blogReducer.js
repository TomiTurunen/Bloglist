/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

let initialState = []
export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		initialState = blogs
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs,
		})
	}
}

export const updateBlog = (blog, comment) => {
	return async dispatch => {
		dispatch({
			type: 'UPDATE_BLOG',
			blog: blog,
			comment: comment,
		})
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case 'INIT_BLOGS':
		return action.data
	case 'UPDATE_BLOG':
		const id = action.blog.id
		const blogToChange = state.find(a => a.id === id)
		const changedBlog = {
			...blogToChange,
			comments: blogToChange.comments.concat(action.comment)
		}
		const blogs = state.map(blog =>
			blog.id !== id ? blog : changedBlog)
		blogs.sort((a, b) => b.votes - a.votes)

		return blogs
	default: return state
	}
}

export default reducer