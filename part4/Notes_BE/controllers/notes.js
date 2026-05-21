// route logic only (request handlers)
// handles requests, does not know how the app is configured, just the business logic related to notes

const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const logger = require('../utils/logger')
const Note = require('../models/note')
const User = require('../models/user')

// creates a helper function
// extract JWT token from request headers
const getTokenFrom = request => {
  const authorization = request.get('authorization') // reads the HTTP header, might contain 'Bearer xxxxxx.yyyyyy.zzzzzz' which means the holder of this token is authenticated
  if(authorization && authorization.startsWith('Bearer ')) {
    // transforms authorization without the 'Bearer'
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
  // without async await
  /* Note.find({}).then(notes => {
    response.json(notes)
  }) */
})

// route for fetching a single resource
notesRouter.get('/:id', async (request, response) => {
  // only the parts of the URL you define with ':' appear in request.params
  const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  // jwt.verify returns the original payload (contains the user ID stored in the token)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  // const user = await User.findById(body.userId)

  console.log('body.userId', body.userId)

  if(!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  })

  const savedNote = await note.save()  
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote)

  // without async await
  // note.save()
  //   .then(savedNote => {
  //     response.status(201).json(savedNote)
  //   })
  //   .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response) => {  
  const id = request.params.id

  await Note.findByIdAndDelete(id)
  response.status(204).end()

  // without async await
  // Note.findByIdAndDelete(id)
  //   .then(result => {
  //     response.status(204).end()
  //     logger.info(`${id} has been deleted`, result)
  //   })
  //   .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const { content, important } = request.body

  Note.findById(id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      // save() method provides full validation, correct choice for updating a single document
      return note.save()
    })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter