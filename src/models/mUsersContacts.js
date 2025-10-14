const Sequelize = require('sequelize')
const database = require('./db');

const mUsersContacts = database.define('UsersContacts',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    UserId:{
        type:Sequelize.UUID,
        
    },
    ContactId:{
        type:Sequelize.UUID,
        
    }
}, {paranoid: true, tableName: 'UsersContacts'})
module.exports = mUsersContacts;