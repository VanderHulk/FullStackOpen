// error handler, unknown endpoint handler

const logger = require('./logger')

// runs before routes, logs request info, always calls next() to continue
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

// runs if no route matches
// does not call next() because it ends the response
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Express recognizes this as error middleware because it has 4 parameters
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  // invalid Mongo ID format
  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  // schema validation failed
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}