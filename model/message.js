const {DataTypes} = require('sequelize');
const sequelize = require('../path/database');
    const Message = sequelize.define('Message', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });



    module.exports = Message;

