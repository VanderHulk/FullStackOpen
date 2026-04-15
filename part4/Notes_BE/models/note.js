// Mongoose schema + model for notes, defines the structure of the documents in the MongoDB collection and provides an interface for interacting with the database

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// defining specific validation rules for each field in the schema
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)