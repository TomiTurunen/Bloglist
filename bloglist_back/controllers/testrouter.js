const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

router.post('/reset', async (request, response) => {
	await Comment.deleteMany({})
	await Blog.deleteMany({})
	await User.deleteMany({})

	response.status(204).end()
})

router.get('/', async (request, response) => {
	try {
		const users = await User.
			find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
		response.json(users.map(user => user.toJSON()))
	} catch (exception) {
		console.log(exception)
		response.status(400).send({ error: 'malformatted id' })
	}
})

module.exports = router