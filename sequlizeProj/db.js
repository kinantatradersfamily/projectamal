const Sequelize = require('sequelize');

const sequelize = new Sequelize('test_sq', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  
});

module.exports = sequelize;
