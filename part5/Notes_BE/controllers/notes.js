// route logic only (request handlers)
// handles requests, does not know how the app is configured, just the business logic related to notes

const notesRouter = require('express').Router()
const Note = require('../models/note')
const middleware = require('../utils/middleware')

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

notesRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  })

  const savedNote = await note.save()  
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', middleware.userExtractor, async (request, response) => {  
  const id = request.params.id

  const user = request.user

  const note = await Note.findById(id)

  if(!note) {
    return response.status(400).json({
      error: 'Note not found!'
    })
  }  

  if(note.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'Unauthorized to delete this note' })
  }

  await Note.findByIdAndDelete(id)

  user.notes = user.notes.filter(note => note.toString() !== id)
  await user.save()

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