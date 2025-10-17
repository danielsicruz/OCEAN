const Sequelize = require('sequelize')
const database = require('./db');
const User = require('./mUser');
const { all } = require('express/lib/application');

const InstitutesUsers = database.define('InstitutesUsers',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    userLevel:{
        type:Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    UserId:{
        type:Sequelize.UUID,
        allowNull: false,        
    },
    InstituteId:{
        type:Sequelize.UUID,
        allowNull: false,        
    }
}, {paranoid: true, tableName: 'InstitutesUsers'})
module.exports = InstitutesUsers;