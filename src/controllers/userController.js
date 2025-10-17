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
    tochange.password = data.password ? data.password : tochange.password;
    tochange.email = data.email ? data.email : tochange.email;
    tochange.userLevel = data.userLevel ? data.userLevel : tochange.userLevel;

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