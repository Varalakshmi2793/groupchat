const {DataTypes} = require('sequelize');
const sequelize = require('../path/database');
    const Group = sequelize.define('Group', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });

    module.exports= Group;

