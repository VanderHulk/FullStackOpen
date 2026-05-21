const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

// for creating a database object ID that does not belong to any note object in the database
// the variable note still exists in memory
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  // after .save(), document exists in MongoDB, properties like content exists in memory
  await note.deleteOne()
  // after .deleteOne(), document is gone from DB, but still exists in memory

  // _id is not a plain string, it is a special MongoDB ObjectId object
  return note._id.toString()
}

// for checking the notes stored in the database
// queries MongoDB directly
// bypasses HTTP completely ignores Express entirely
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb
}