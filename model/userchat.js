const { DataTypes } = require('sequelize');
const sequelize = require('../path/database');



const UserChat = sequelize.define('UserChat', {
    
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Chat',
        key: 'id'
      }
    }
  });
  

module.exports = UserChat;
