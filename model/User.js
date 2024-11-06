// models/user.js

const { DataTypes } = require('sequelize');
const {sequelize, initDatabase } = require('../lib/sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  // Other model options
  tableName: 'Users',
});

initDatabase()

module.exports = User;
