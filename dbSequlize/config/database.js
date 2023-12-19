const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdb', 'syvora', ' 1234', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres'  
});


module.exports = sequelize;
