const Artifact = require("../models/mArtifact");
const Tag = require("../models/mTag");
const ArtifactsTag = require("../models/mArtifactsTag")

exports.create = async (data) => {
    response = await ArtifactsTag.create({
        idTag: data.Tag,
        idArtifact: data.Artifact,
    });
    return response;
}

exports.bulkCreate = async (data) => {
    response = await ArtifactsTag.bulkCreate(data);
    return response;
}

exports.select = async (filters = null, res) => {
    let response;
    if (filters == null) {

        response = await ArtifactsTag.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await ArtifactsTag.findAll({
            where: filters
        });
        return response;
    }

}

exports.freeQuery = async (params = null, res) => {
    let response;
    if (params == null) {

        response = await ArtifactsTag.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await ArtifactsTag.findAll(params);
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    response = await ArtifactsTag.findOne({
        where: filters
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await ArtifactsTag.findByPk(data.id);

    tochange.idTag = data.idTag ? data.idTag : tochange.idTag;
    tochange.idArtifact = data.idArtifact ? data.idArtifact : tochange.idArtifact;
    
    
    return response;
}

exports.delete = async (data, res) => {
    return ArtifactsTag.destroy({
        where: {
            id: data.id
        }
    });
}