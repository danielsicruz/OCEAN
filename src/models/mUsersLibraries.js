const Sequelize = require('sequelize')
const database = require('./db');

const UserLibraries = database.define('UsersLibraries',{
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
        type:Sequelize.UUID
    },
    LibraryId:{
        type:Sequelize.UUID
    }
}, {paranoid: true, tableName: 'UsersLibraries'})
module.exports = UserLibraries;