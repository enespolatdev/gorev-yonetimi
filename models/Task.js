const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
});

module.exports = Task;
