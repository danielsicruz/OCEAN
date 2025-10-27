const { ar } = require("@faker-js/faker");
const Tags = require("../models/mTag")
const Library = require("../models/mLibrary");
const sequelize = require('sequelize');


exports.create = async (data) => {
    response = await Tags.create({
        id: data.id,
        name: data.name,
    });
    return response;
}

exports.bulkCreate = async (data) => {
    response = await Tags.bulkCreate(data);
    return response;
}

exports.select = async (filters = null, res) => {
    let response;
    if (filters == null) {

        response = await Tags.findAll(
            {
               
            }
        );
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await Tags.findAll({
            where: filters
        });
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    response = await Tags.findOne({
        where: filters,
        
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await Tags.findByPk(data.id);

    tochange.name = data.name ? data.name : tochange.name;

    response = await tochange.save();
    return response;
}

exports.delete = async (data, res) => {
    return Tags.destroy({
        where: {
            id: data.id
        }
    });
}