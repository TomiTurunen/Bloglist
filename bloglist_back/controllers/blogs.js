const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
    console.log("GET BLOG!!")
    try {
        const blogs = await Blog.find({})
            .populate('user', { username: 1, name: 1, id: 1 })
            .populate('comments', { content: 1, id: 1 })
        response.json(blogs.map(blog => blog.toJSON()))
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.post('/', async (request, response) => {
    console.log("ADD BLOG!!")
    const testMode = process.env.NODE_ENV === 'test'
    const body = request.body
    try {
        const user = null
        if (!testMode) {
            const decodedToken = jwt.verify(request.token, process.env.SECRET)
            if ((!request.token || !decodedToken.id)) {
                return response.status(401).json({ error: 'token missing or invalid' })
            }
            user = await User.findById(decodedToken.id)
        }
        if (body.title === undefined || body.url === undefined) {
            response.status(400).send({ error: 'title and url are mandatory!' })
        } else {
            const blog = new Blog({
                title: body.title,
                author: body.author,
                url: body.url,
                likes: body.likes === undefined ? 0 : body.likes,
                user: testMode ? null : user.id
            })
            const savedBlog = await blog.save()
            if (!testMode) {
                user.blogs = user.blogs.concat(savedBlog.id)
                await user.save()
            }
            response.json(savedBlog.toJSON())
        }
    } catch (exception) {
        console.log(exception)
    }

})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const blog = await Blog.findById(request.params.id)
        const bloggerId = blog.user
        if (decodedToken.id === bloggerId.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).json({ error: 'You can delete only your own blogs' }).end()
        }
    } catch (exception) {
        console.log(exception)
    }
})

blogsRouter.put('/:id', async (request, response) => {
    console.log(request.params.id, "put", request.body)
    try {
        const body = request.body
        const savedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            {
                $set: {
                    title: body.title,
                    author: body.author,
                    url: body.url,
                    likes: body.likes === undefined ? 0 : body.likes,
                }
            },
            { new: true })
        response.json(savedBlog.toJSON())
        console.log(savedBlog.toJSON())
    } catch (exception) {
        console.log(exception)
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    console.log("I AM HERE!!")
    const blogId = request.params.id
    const body = request.body
    try {
        const comment = new Comment({
            content: body.content,
            blog: blogId
        })
        const savedComment = await comment.save()
        const blog = await Blog.findById(blogId)
        blog.comments = blog.comments ? blog.comments.concat(savedComment.id) : []
        await blog.save()
        response.json(savedComment.toJSON())
    } catch (exception) {
        console.log(exception)
    }
})

module.exports = blogsRouter