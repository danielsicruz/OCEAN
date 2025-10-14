const Sequelize = require('sequelize')
const database = require('./db');

const Contact = database.define('Contact',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name:{
        type: Sequelize.STRING
    },
    info:{
        type:Sequelize.TEXT
    }
}, {paranoid: true, tableName: 'Contact'})
module.exports = Contact;