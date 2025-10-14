const Sequelize = require('sequelize')
const database = require('./db');

const User = database.define('User',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name:{
        type: Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
        //unique: true
    },
    password:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    userLevel:{
        type:Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {paranoid: true})
module.exports = User;