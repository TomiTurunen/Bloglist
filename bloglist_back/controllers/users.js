const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const uniqueValidator = require('mongoose-unique-validator')

usersRouter.get('/', async (request, response) => {
    console.log("Etsitaan kayttajia")
    try {
        const users = await User.
            find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
        response.json(users.map(user => user.toJSON()))
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

usersRouter.post('/', async (request, response, next) => {
    console.log("POSTATTIIN")
    try {
        const body = request.body
        console.log(body.password, body.password.length < 3, body.password.lenght)
        if (body.password === undefined || body.password.length < 3) {
            response.status(405).send({ error: 'too short password' })
        } else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash
            })

            const savedUser = await user.save()

            response.json(savedUser)

        }
    } catch (exception) {
        response.status(405).send({ error: 'too short username' })
        console.log(exception)
    }
})

module.exports = usersRouter