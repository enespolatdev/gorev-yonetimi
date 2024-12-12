const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gorev_yonetimi', 'root', 'sifreniz', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
