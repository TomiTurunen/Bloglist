const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const testBlog =
{
    title: "Kick",
    author: "R. A. Salvatore",
    url: "http://blog.cleancoder.com/salvatore2.html",
    likes: 42,
}
const testBlogLikesNull =
{
    title: "Epic",
    author: "Rhapsody",
    url: "http://blog.cleancoder.com/rhapsody.html",
}

const noUrlBlog =
{
    title: "Step",
    author: "R. A. Salvatore2",
    likes: 442,
}

const noTitleBlog =
{
    author: "R. A. Salvatore2",
    url: "http://blog.cleancoder.com/agony.html",
    likes: 442,
}

describe('json test', () => {
    test.only('Test blog json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('blog json', () => {
    test.only('Test id format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(4)
        response.body.map(blog => {
            expect(blog.id).toBeDefined
        })
    })
})

describe('post blog', () => {
    test.only('Test post log', async () => {

        await api.get('/api/blogs')
        const old_response = await api.get('/api/blogs')
        const oldCount = old_response.body.length
        await api
            .post('/api/blogs')
            .send(testBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(oldCount + 1)
        const lastBlog = response.body[response.body.length - 1]
        delete lastBlog.id
        delete lastBlog.user
        expect(lastBlog).toEqual(testBlog)
    })
})

describe('likes default', () => {
    test.only('Test put likes default 0', async () => {
        await api
            .post('/api/blogs')
            .send(testBlogLikesNull)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const lastBlog = response.body[response.body.length - 1]
        expect(lastBlog.likes).toBe(0)
    })
})

describe('title url default', () => {
    test.only('Test that have title and url', async () => {
        await api
            .post('/api/blogs')
            .send(noUrlBlog)
            .expect(400)
        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .expect(400)
    })
})

describe('delete last', () => {
    test.only('Test delete last', async () => {
        await api.get('/api/blogs')
        const old_response = await api.get('/api/blogs')
        const deleteBlogId = old_response.body[old_response.body.length - 1].id
        await api
            .delete('/api/blogs/' + deleteBlogId)
            .expect(204)
        await api.get('/api/blogs')
        const new_response = await api.get('/api/blogs')
        const lastBlogId = new_response.body[new_response.body.length - 1].id
        expect(lastBlogId).not.toEqual(deleteBlogId)
    })
})

describe('update likes', () => {
    test.only('Test post log', async () => {

        await api.get('/api/blogs')
        const old_response = await api.get('/api/blogs')
        const lastBlog = old_response.body[old_response.body.length - 1]
        const lastBlogLikes = lastBlog.likes
        lastBlog.likes = lastBlogLikes + 1;
        await api
            .put('/api/blogs/' + lastBlog.id)
            .expect(200)
            .send(lastBlog)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        expect(response.body[response.body.length - 1].likes).toBe(lastBlogLikes + 1)
    })
})


afterAll(() => {
    mongoose.connection.close()
})