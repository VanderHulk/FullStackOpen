require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// custom middleware
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(express.static('dist'))

// activate the json-parser
// without this request.body would be undefined for JSON requests
app.use(express.json())

app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })    
})

// route for fetching a single resource
app.get('/api/notes/:id', (request, response, next) => {
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
    // When notes[] was stored in memory
    // const id = request.params.id
    // const note = notes.find(note => note.id === id)

    // if(note) {
    //     response.json(note)
    // } else {
    //     response.status(404).end()
    // }
})

// deleting resources
app.delete('/api/notes/:id', (request, response, next) => {   
    const id = request.params.id

    Note.findByIdAndDelete(id)
      .then(() => {
        response.status(204).end()
        console.log(`${id} has been deleted`)
      })
      .catch(error => next(error))
    // When notes[] was stored in memory
    // const id = request.params.id
    // notes = notes.filter(note => note.id !== id)

    // response.status(204).end()
})

// When we had to generate an ID
// const generateID = () => {  
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => Number(n.id)))
//     : 0
//   return String(maxId + 1)
// }

app.post('/api/notes', (request, response) => {  
  const body = request.body
  
  if(!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    // id: generateID()
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })

  // When notes[] was stored in memory
  // console.log(note)
  // notes = notes.concat(note)  
  // response.json(note)
})

app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  const { content, important } = request.body

  Note.findById(id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }  
      
      // live object directly from Mongoose document instance
      note.content = content
      note.important = important

      // .save() writes the changes back to MongoDB
      // Monggoes validation runs here: checks required fields, types, and custom validators
      return note.save().then((updateNote) => {
        response.json(updateNote)
      })
    })    
    .catch(error => next(error))

  // When notes[] was stored in memory
  // const note = notes.find(n => n.id === String(id))
  // const changedNote = { ...note, important: !note.important}

  // notes = notes.map(note => note.id === id ? changedNote : note)
  // response.json(changedNote)
}) 

// Catch-all for unknown routes must come LAST
app.use(unknownEndpoint)

app.use(errorHandler)

// listening to port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})