const env = process.env.NODE_ENV || 'development';
const config = require("./config.json")[env];
const Sequelize = require('sequelize');

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
