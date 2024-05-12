
const { DataTypes } = require('sequelize');
const sequelize = require('../path/database');

const Message = sequelize.define('Message', {
    sender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
module.exports = Message;
