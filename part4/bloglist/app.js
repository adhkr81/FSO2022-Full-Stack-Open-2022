// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const mongoose = require('mongoose')
mongoose.connect(config.MONGODB_URI)


app.use(cors())
app.use(express.json())
app.use(middleware.getTokenFrom)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

const blogRouter = require('./controllers/blogs')
app.use('/api/blogs', blogRouter)

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

module.exports = app