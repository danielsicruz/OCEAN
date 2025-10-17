const LibrariesInstitutes = require("../models/mLibrariesInstitutes")

exports.create = async (data) => {
    response = await LibrariesInstitutes.create({
        userLevel: data.userLevel,
        UserId: data.UserId,
        InstituteId: data.InstituteId,
    });
    return response;
}

exports.bulkCreate = async (data) => {
    response = await LibrariesInstitutes.bulkCreate(data);
    return response;
}

exports.select = async (filters = null, res) => {
    let response;
    if (filters == null) {

        response = await LibrariesInstitutes.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await LibrariesInstitutes.findAll({
            where: filters
        });
        return response;
    }

}

exports.freeQuery = async (params = null, res) => {
    let response;
    if (params == null) {

        response = await LibrariesInstitutes.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await LibrariesInstitutes.findAll(params);
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    response = await LibrariesInstitutes.findOne({
        where: filters
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await LibrariesInstitutes.findByPk(data.id);

    tochange.userLevel = data.userLevel ? data.userLevel : tochange.userLevel;
    tochange.UserId = data.UserId ? data.UserId : tochange.UserId;
    tochange.InstituteId = data.InstituteId ? data.InstituteId : tochange.InstituteId;
    
    
    return response;
}

exports.delete = async (data, res) => {
    return LibrariesInstitutes.destroy({
        where: {
            id: data.id
        }
    });
}