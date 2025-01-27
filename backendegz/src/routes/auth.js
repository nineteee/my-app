const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');  // path
const router = express.Router();

// register
router.post('/register', [
  check('username').notEmpty().withMessage('Логин обязателен'),
  check('password').isLength({ min: 6 }).withMessage('Пароль должен содержать минимум 6 символов'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким логином уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword, role: role || 'user' });

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка регистрации' });
  }
});

// login generate JWT
router.post('/login', [
  check('username').notEmpty().withMessage('Логин обязателен'),
  check('password').notEmpty().withMessage('Пароль обязателен'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: 'Неверный логин или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Неверный логин или пароль' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

module.exports = router;
