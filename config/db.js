const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER || null,
  process.env.DB_PASS || null,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = db;
