const Sequelize = require('sequelize')
const database = require('./db');

const mArtifactsTags = database.define('ArtifactsTags',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    idArtifact:{
        type:Sequelize.UUID,
        
    },
    idTag:{
        type:Sequelize.UUID,
        
    }
}, {paranoid: true, tableName: 'ArtifactsTags'})
module.exports = mArtifactsTags;