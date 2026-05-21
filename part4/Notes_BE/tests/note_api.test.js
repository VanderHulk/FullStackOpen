// backend testing
// testing API behavior through HTTP requests (full app behavior)

const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const config = require('../utils/config')
const helper = require('./testNote_helper')
const Note = require('../models/note')

// supertest(app) wraps app into a fake client
// now api can do things like api.get('/api/notes')
const api = supertest(app)

// before(async () => {
//   console.log('Connection to DB:', config.MONGODB_URI)
//   await mongoose.connect(config.MONGODB_URI)
// })

describe('when there is initially some notes saved', () => {

  // every test starts from a clean identical world
  // if not, environment where you run the tests becomes unpredictable
  // remember: test assumptions rely on a known state
  // cannot leave the database empty becasue tests will lose their meaning; tests that expect data would fail immediately
  beforeEach(async () => {
    await Note.deleteMany({})
    console.log('cleared')

    // simpler way, use Mongoose's built-in method insertMany
    //  dump everything in one go
    await Note.insertMany(helper.initialNotes)

    // const noteObjects = helper.initialNotes
    //   .map(note => new Note(note))
    // const promiseArray = noteObjects.map(note => note.save())
    // await Promise.all(promiseArray)

    console.log('done')

    // let noteObject = new Note(helper.initialNotes[0])
    // await noteObject.save()

    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()
  })

  test('notes are returned as json', async () => {
    console.log('entered test')

    const response = await api
      .get('/api/notes') // pretends a user opened /api/notes
      .expect(200)
      .expect('Content-Type', /application\/json/)

      console.log('STATUS:', response.status)
      console.log('BODY:', response.body)

      // OR (NO CHAINING)
      /* 
      assert.strictEqual(response.status, 200)
      assert.strictEqual(
        response.headers['content-type'].includes('application/json'),
        true
      )
      */
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    console.log('all notes are returned (response):', response.body)

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    console.log('a specific note is within the returned notes (response):', response.body)

    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'), true)
  })

  describe('viewing a specific note', () => {

    test('a specific note can be viewed', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)  
      
      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.get(`/api/notes/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 id is invalid', async() => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/notes/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new note', () => {

    test('a valid note can be added', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('note without content is not added', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('a note can be deleted', async() => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()

      const ids = notesAtEnd.map(n => n.id)
      assert(!ids.includes(noteToDelete.id))

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length-1)
    })
  })  
})

// close connection once
after(async () => {
  await mongoose.connection.close()
})