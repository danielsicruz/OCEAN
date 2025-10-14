const { ar } = require("@faker-js/faker");
const User = require("../models/mUser")
const Library = require("../models/mLibrary");
const sequelize = require('sequelize');


exports.create = async (data) => {
    response = await User.create({
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        userLevel: data.userLevel
    });
    return response;
}

exports.bulkCreate = async (data) => {
    response = await User.bulkCreate(data);
    return response;
}

exports.select = async (filters = null, res) => {
    let response;
    if (filters == null) {

        response = await User.findAll(
            {
               
            }
        );
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await User.findAll({
            where: filters
        });
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    response = await User.findOne({
        where: filters,
        
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await User.findByPk(data.id);

    tochange.name = data.name ? data.name : tochange.name;
    tochange.description = data.description ? data.description : tochange.description;
    tochange.imagePath = data.imagePath ? data.imagePath : tochange.imagePath;
    tochange.foundPlace = data.foundPlace ? data.foundPlace : tochange.foundPlace;
    tochange.age = data.age ? data.age : tochange.age;
    tochange.historicalContext = data.historicalContext ? data.historicalContext : tochange.historicalContext;
    tochange.whoFound = data.whoFound ? data.whoFound : tochange.whoFound;
    tochange.coordinates = data.coordinates ? data.coordinates : tochange.coordinates;
    tochange.dimensions = data.dimensions ? data.dimensions : tochange.dimensions;
    tochange.weight = data.weight ? data.weight : tochange.weight;
    tochange.texture = data.texture ? data.texture : tochange.texture;
    tochange.materialComposition = data.materialComposition ? data.materialComposition : tochange.materialComposition;
    tochange.historicalPeople = data.historicalPeople ? data.historicalPeople : tochange.historicalPeople;
    tochange.origin_or_utility = data.origin_or_utility ? data.origin_or_utility : tochange.origin_or_utility;
    tochange.socialRelevance = data.socialRelevance ? data.socialRelevance : tochange.socialRelevance;

    response = await tochange.save();
    return response;
}

exports.delete = async (data, res) => {
    return User.destroy({
        where: {
            id: data.id
        }
    });
}