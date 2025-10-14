const Sequelize = require('sequelize')
const database = require('./db');

const ArtifactsLibraries = database.define('ArtifactsLibraries',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    ArtifactId:{
        type:Sequelize.UUID,
        
    },
    LibraryId:{
        type:Sequelize.UUID,
        
    }
}, {paranoid: true, tableName: 'ArtifactsLibraries'})
module.exports = ArtifactsLibraries;