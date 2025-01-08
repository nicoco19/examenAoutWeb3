const mongoose = require('mongoose')


const CommentSchema = new mongoose.Schema({
  idBook: String,
  username: String,
  comment: String
})

CommentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', CommentSchema)