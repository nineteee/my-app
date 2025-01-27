const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();

// configure
const sequelize = new Sequelize('book_author_system', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

// connect check
sequelize.authenticate()
  .then(() => console.log("good"))
  .catch((err) => console.error("nope", err));

// settings
app.listen(3000, () => {
  console.log("port 3000");
});
