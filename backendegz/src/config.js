const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "book_author_system", // database name
  "postgres",      // username
  "1234",      // password
  {
    host: "127.0.0.1",
    dialect: "postgres",
  }
);

module.exports = sequelize;
