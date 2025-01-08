const router = require('express').Router()
const Book = require('../models/book')

router.get("/", (req, res, next) => {
  Book.find({})
  .then(books => res.json(books))
  .catch(err => next(err));
});

module.exports = router