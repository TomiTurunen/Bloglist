const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')


describe('one user initially', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User(
            {
                username: 'tomit',
                name: 'Tomi Turunen',
                password: 'qwerty'
            })
        await user.save()
    })

    test('creation succeed in unique username', async () => {
        const newUser = {
            username: 'tomi1',
            name: 'Tomi Turunen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe(' not unique one user initially', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'tomi', password: 'password' })
        await user.save()
    })

    test('creation succeed in unique username', async () => {
        const newUser = {
            username: 'tomi',
            name: 'Tomi Turunen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(405)
            .expect('Content-Type', /application\/json/)
    })
})

describe('too short username', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'tomi', password: 'password' })
        await user.save()
    })
    test('test too short username', async () => {
        const newUser = {
            username: 'to',
            name: 'Tomi Turunen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(405)
            .expect('Content-Type', /application\/json/)
    })
})

describe('too short password', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'tomi', password: 'password' })
        await user.save()
    })
    test('test too short username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'tomi8',
            name: 'Tomi Turunen',
            password: 'sa',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(405)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    })
})

