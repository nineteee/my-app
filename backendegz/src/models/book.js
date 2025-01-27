const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3],
    },
  },
  summary: {
    type: DataTypes.STRING,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [10, 13], // Проверка на длину ISBN
      is: /^[0-9\-]+$/, // Проверка на цифры и дефисы
    },
  },
});

module.exports = Book;
