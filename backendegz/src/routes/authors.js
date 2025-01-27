const express = require('express');
const { check } = require('express-validator');
const Author = require('../models/author.js');
const router = express.Router();

// Получить всех авторов
router.get('/', async (req, res) => {
  const authors = await Author.findAll({ include: 'Books' });
  res.json(authors);
});

// Создать нового автора
router.post('/', [
  check('name').isLength({ min: 2 }).withMessage('Имя должно содержать минимум 2 символа'),
  check('birthDate').isDate().withMessage('Неверная дата рождения'),
], async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
