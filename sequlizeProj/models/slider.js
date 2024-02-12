const Sequelize = require('sequelize');
const sequelize = require('../db');

const Slider = sequelize.define('Slider', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description_image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
});

module.exports = Slider;
