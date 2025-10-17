const Sequelize = require('sequelize')
const database = require('./db');

const Library = database.define('Library',{
    id:{
        type:Sequelize.STRING,
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
    description:{
        type:Sequelize.TEXT
    },
    city:{
        type:Sequelize.TEXT
    },
    state:{
        type:Sequelize.TEXT
    },
    country:{
        type:Sequelize.TEXT
    },
    private:{
        type:Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    imagePath:{
        type:Sequelize.TEXT
    }

}, {paranoid: true, tableName: 'Libraries'})
module.exports = Library;