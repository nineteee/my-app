const express = require('express');
const { check } = require('express-validator');
const Book = require('../models/book.js');
const Author = require('../models/author.js');
const router = express.Router();

// get
router.get('/', async (req, res) => {
  const books = await Book.findAll({ include: 'Author' });
  res.json(books);
});

// create
router.post('/', [
  check('title').isLength({ min: 3 }).withMessage('min 3 words'),
  check('isbn').isISBN().withMessage('incorrect ISBN'),
  check('authorId').isInt().withMessage('incorrect author ID'),
], async (req, res) => {
  try {
    const author = await Author.findByPk(req.body.authorId);
    if (!author) {
      return res.status(404).json({ error: 'Автор не найден' });
    }
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
