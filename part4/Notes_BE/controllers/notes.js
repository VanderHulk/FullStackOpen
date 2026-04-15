// route logic only (request handlers)
// handles requests, does not know how the app is configured, just the business logic related to notes

const notesRouter = require('express').Router()
const logger = require('../utils/logger')
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// route for fetching a single resource
notesRouter.get('/:id', (request, response, next) => {
  // only the parts of the URL you define with ':' appear in request.params
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  Note.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
      logger.info(`${id} has been deleted`, result)
    })
    .catch(error => next(error))
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