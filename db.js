const path = "./config.env"
require('dotenv').config({path:path});

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // Specify the database dialect explicitly
    port: process.env.DB_PORT,
    logging: process.env.DB_LOGGING === 'true' ? true : false, // Convert string to boolean
  });

module.exports = sequelize;