const {DataTypes} = require('sequelize');
const sequelize = require('../path/database');

    const UserGroups = sequelize.define('UserGroups', {});
    
    module.exports = UserGroups;
