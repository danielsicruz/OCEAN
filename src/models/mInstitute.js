const Sequelize = require('sequelize')
const database = require('./db');

const Institute = database.define('Institute',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    vid:{
        type:Sequelize.STRING,
    },
    name:{
        type: Sequelize.STRING
    },
    country:{
        type:Sequelize.TEXT
    },
    state:{
        type:Sequelize.TEXT
    },
    city:{
        type:Sequelize.TEXT
    },
    address:{
        type:Sequelize.TEXT
    },
    number:{
        type:Sequelize.TEXT
    },
}, {paranoid: true})
module.exports = Institute;