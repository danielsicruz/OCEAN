const Sequelize = require('sequelize')
const database = require('./db');

const LibrariesInstitutes = database.define('LibrariesInstitutes',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    LibraryId:{
        type:Sequelize.UUID,
        
    },
    InstituteId:{
        type:Sequelize.UUID,
        
    }
}, {paranoid: true, tableName: 'LibrariesInstitutes'})
module.exports = LibrariesInstitutes;