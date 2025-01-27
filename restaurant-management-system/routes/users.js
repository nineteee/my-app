const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const { QueryTypes } = require('sequelize');

// Получение всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await sequelize.query(
      'SELECT * FROM users',
      { type: QueryTypes.SELECT }
    );
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'errorfail' });
  }
});

// Создание пользователя
router.post('/', async (req, res) => {
  const { username, email } = req.body;
  try {
    const result = await sequelize.query(
      'INSERT INTO users (username, email) VALUES (:username, :email) RETURNING *',
      {
        replacements: { username, email },
        type: QueryTypes.INSERT,
      }
    );
    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'errrooooor' });
  }
});

// Удаление пользователя
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query('DELETE FROM users WHERE id = :id', {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
    res.json({ message: 'user deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error user delete' });
  }
});

module.exports = router;
