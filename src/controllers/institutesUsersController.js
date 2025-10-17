const InstitutesUsers = require("../models/mInstitutesUsers")

exports.create = async (data) => {
    response = await InstitutesUsers.create({
        LibraryId: data.LibraryId,
        InstituteId: data.InstituteId,
    });
    return response;
}

exports.bulkCreate = async (data) => {
    response = await InstitutesUsers.bulkCreate(data);
    return response;
}

exports.select = async (filters = null, res) => {
    let response;
    if (filters == null) {

        response = await InstitutesUsers.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await InstitutesUsers.findAll({
            where: filters
        });
        return response;
    }

}

exports.freeQuery = async (params = null, res) => {
    let response;
    if (params == null) {

        response = await InstitutesUsers.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await InstitutesUsers.findAll(params);
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    response = await InstitutesUsers.findOne({
        where: filters
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await InstitutesUsers.findByPk(data.id);

    tochange.LibraryId = data.LibraryId ? data.LibraryId : tochange.LibraryId;
    tochange.InstituteId = data.InstituteId ? data.InstituteId : tochange.InstituteId;
    
    
    return response;
}

exports.delete = async (data, res) => {
    return InstitutesUsers.destroy({
        where: {
            id: data.id
        }
    });
}