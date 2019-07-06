import React, { useState } from 'react'
import {
	BrowserRouter as Router,
	Route, Link, Redirect, withRouter
} from 'react-router-dom'
import blogService from '../services/blogs'
import { ListGroup } from 'react-bootstrap'

export const Blog = ({ blog }) => {


	const link = '/blogs/' + blog.id
	const padding = {
		paddingRight: 5
	}
	return (
		<ListGroup.Item>
			<Link to={link} style={padding}>{blog.title} {blog.author}</Link>
		</ListGroup.Item>
	)
}

export const SingleBlog = ({ props, blog, user, setBlogs }) => {
	const [content, setContent] = useState('')
	const handleAddComment = async (event) => {
		event.preventDefault()
		try {
			const comment = await blogService.createComment({
				content: content,
			}, blog.id)
			props.updateBlog(blog, comment)
			props.handleNotification('Lisätty kommentti: ' + content, true)
		} catch (exception) {
			props.handleNotification('Kommentin luonti epäonnistui', false)
		}
	}


	if (!blog) {
		return (<div></div>)
	} else {
		return (
			<div>
				<h2>{blog.title} {blog.author}</h2>
				<a href={blog.url}>{blog.url} </a><br />
				{blog.likes} likes <button onClick={() => handleLike(blog, props)}>like</button> <br />
				added by {blog.user ? blog.user.name : 'unknown'}
				{blog.user && user.id === blog.user.id ? <button onClick={() => handleDelete(blog, setBlogs)}>remove</button> : ''}
				<br />
				<h3>comments</h3>
				<form onSubmit={handleAddComment}>
					<div>
						<input
							type="text"
							name="Content"
							onChange={({ target }) => setContent(target.value)}
						></input>
						<button type='submit'>add comment</button>
					</div>
				</form>
				<ul>
					{blog.comments.map(comment =>
						<li key={comment.id}>{comment.content}</li>
					)}
				</ul>
			</div >
		)
	}
}


const handleLike = async (blog, props) => {
	try {
		await blogService.addOneLike({
			id: blog.id,
			likes: blog.likes,
			user: blog.user ? blog.user.id : null,
			author: blog.author,
			title: blog.title,
			url: blog.url,
		})
		props.updateLikes(blog)
	} catch (exception) {
		console.log(exception)
	}
}

const handleDelete = async (blog, setBlogs) => {
	try {
		if (window.confirm('Are you sure, that you want delete?')) {
			await blogService.deleteOne({
				id: blog.id,
			}, setBlogs)
		}
	} catch (exception) {
		console.log(exception)
	}
}

