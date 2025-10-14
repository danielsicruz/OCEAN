const Institute = require("../models/mInstitute")

exports.create = async (data) => {
    response = await Institute.create({
        id: data.id,
        name: data.name,
        city: data.city,
        country: data.country,
        address: data.address,
        state: data.state,
        number: data.number,
    });
    return response;
}

exports.bulkCreate = async (data) => {
    response = await Institute.bulkCreate(data);
    return response;
}

exports.select = async (filters = null, res) => {
    let response;
    if (filters == null) {

        response = await Institute.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await Institute.findAll({
            where: filters
        });
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    response = await Institute.findOne({
        where: filters
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await Institute.findByPk(data.id);

    tochange.name = data.name ? data.name : tochange.name;
    tochange.country = data.country ? data.country : tochange.country;
    tochange.state = data.state ? data.state : tochange.state;
    tochange.city = data.city ? data.city : tochange.city;
    tochange.address = data.address ? data.address : tochange.address;
    tochange.number = data.number ? data.number : tochange.number;
    response = await tochange.save();
    return response;
}

exports.delete = async (data, res) => {
    return Institute.destroy({
        where: {
            id: data.id
        }
    });
}