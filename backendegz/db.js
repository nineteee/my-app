const { Sequelize } = require('sequelize');

// Укажите параметры подключения к вашей базе данных
const sequelize = new Sequelize('book_author_system', 'postgres', '1234', {
  host: 'localhost', // Адрес сервера базы данных (если PostgreSQL на том же сервере)
  dialect: 'postgres', // Укажите вашу базу данных
});

// Проверка соединения с БД
sequelize.authenticate()
  .then(() => console.log("good"))
  .catch((err) => console.error("nope", err));
