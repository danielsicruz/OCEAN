const Sequelize = require('sequelize')
const database = require('./db');

const InstitutesContacts = database.define('InstitutesContacts',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    }, 
    InstituteId:{
        type:Sequelize.UUID,
        
    },
    ContactId:{
        type:Sequelize.UUID,
        
    }
}, {paranoid: true, tableName: 'InstitutesContacts'})
module.exports = InstitutesContacts;