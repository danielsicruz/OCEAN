const Sequelize = require('sequelize')
const database = require('./db');

const mTag = database.define('Tags',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name:{
        type:Sequelize.STRING,
        
    },
}, {paranoid: true, tableName: 'Tags'})
module.exports = mTag;