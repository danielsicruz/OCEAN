const UsersLibraries = require("../models/mUsersLibraries")

exports.create = async (data) => {
    response = await UsersLibraries.create({
        userLevel: data.userLevel,
        UserId: data.UserId,
        LibraryId: data.LibraryId,
    });
    return response;
}

exports.bulkCreate = async (data) => {
    response = await UsersLibraries.bulkCreate(data);
    return response;
}

exports.select = async (filters = null, res) => {
    let response;
    if (filters == null) {

        response = await UsersLibraries.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await UsersLibraries.findAll({
            where: filters
        });
        return response;
    }

}

exports.freeQuery = async (params = null, res) => {
    let response;
    if (params == null) {

        response = await UsersLibraries.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await UsersLibraries.findAll(params);
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    response = await UsersLibraries.findOne({
        where: filters
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await UsersLibraries.findByPk(data.id);

    tochange.userLevel = data.userLevel ? data.userLevel : tochange.userLevel;
    tochange.UserId = data.UserId ? data.UserId : tochange.UserId;
    tochange.LibraryId = data.LibraryId ? data.LibraryId : tochange.LibraryId;
    
    
    return response;
}

exports.delete = async (data, res) => {
    return UsersLibraries.destroy({
        where: {
            id: data.id
        }
    });
}