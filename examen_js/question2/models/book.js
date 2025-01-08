const mongoose = require('mongoose')


const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  state: String
})

BookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Book', BookSchema)