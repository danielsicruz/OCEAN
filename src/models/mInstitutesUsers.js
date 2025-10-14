const Sequelize = require('sequelize')
const database = require('./db');

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
    }
}, {paranoid: true, tableName: 'InstitutesUsers'})
module.exports = InstitutesUsers;