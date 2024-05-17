const { DataTypes } = require('sequelize');
const sequelize = require('../path/database');

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

module.exports = Chat;
