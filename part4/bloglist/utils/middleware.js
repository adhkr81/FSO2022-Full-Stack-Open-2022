const logger = require('./logger')
const jwt = require('jsonwebtoken')


const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
          error: 'invalid token'
        })
    }

    logger.error(error.message)
    next(error)
}

//Function to get token from Header bearer
const getTokenFrom = (request, response, next) => {

    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
       request["token"] = authorization.substring(7)
    }
    next()
  }


  module.exports = { errorHandler, getTokenFrom }