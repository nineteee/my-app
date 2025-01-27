const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, 
  }
);

// Проверка подключения
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('good.');
  } catch (error) {
    console.error('bad:', error);
  }
}

testConnection();

module.exports = sequelize;
