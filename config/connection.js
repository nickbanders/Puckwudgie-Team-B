const Sequelize = require('sequelize');

require('dotenv').config();

//create connection to our DB
const sequelize = new Sequelize('Puckwudgie_B', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
  
  module.exports = sequelize;
  