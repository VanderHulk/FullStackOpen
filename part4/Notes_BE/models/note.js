// Mongoose schema + model for notes, defines the structure of the documents in the MongoDB collection and provides an interface for interacting with the database

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// defining specific validation rules for each field in the schema
// when .save() runs, mongoose checks the schema, if something does not match, throws a ValidationError
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      minLength: 5,
      required: true
    },
    important: Boolean,
    // creates a reference relationship from a note to a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },  
  },
  {
    timestamps: true
  }
)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)