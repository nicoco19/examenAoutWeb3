const router = require('express').Router();
const Commentaire = require('../models/comment.js');
const Book = require('../models/book');

// Get all comments
router.get("/", (req, res, next) => {
  Commentaire.find({})
  .then(comments => res.json(comments))
  .catch(err => next(err));
});

// Create a new comment
router.post("/", (req, res, next) => {
  const body = req.body;
  const errorMessages = [];

  if (!body.commentaire || body.commentaire.length < 5) {
    errorMessages.push("commentaire must be at least 5 characters long");
  }
  if (!body.username || body.username.length < 3) {
    errorMessages.push("username must be at least 3 characters long");
  }
  if (body.idLivre === undefined) {
    errorMessages.push("idLivre must be present");
  }

  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages });
    return;
  }

  // Check if the book exists
  Book.findById(body.idLivre)
  .then(book => {
    if (!book) {
      res.status(404).json({ errorMessages: ["Book not found"] });
      return;
    }

    // Check if the user has already commented on this book
    Commentaire.findOne({ idLivre: body.idLivre, username: body.username })
    .then(existingComment => {
      if (existingComment) {
        res.status(409).json({ errorMessages: ["User has already commented on this book"] });
        return;
      }

      const newComment = new Commentaire({
        idLivre: body.idLivre,
        username: body.username,
        commentaire: body.commentaire
      });

      newComment.save()
      .then(savedComment => res.status(201).json(savedComment))
      .catch(err => next(err));
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
});

module.exports = router;