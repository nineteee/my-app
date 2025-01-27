const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Book = require('./book'); // Импортируем модель Книги

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2],
    },
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  biography: {
    type: DataTypes.STRING,
    max: 150,
  },
});

// Связь: автор может иметь много книг
Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });

module.exports = Author;
