const sequelize = require('sequelize');
const Library = require("../models/mLibrary")
const UsersLibraries = require("../models/mUsersLibraries")
const ArtifactsLibraries = require("../models/mArtifactsLibraries")
const Institute = require("../models/mInstitute");
const Artifact = require('../models/mArtifact');
const Contact = require('../models/mContact');
const InstitutesUsers = require('../models/mInstitutesUsers');
const { Op } = require("sequelize");


exports.create = async (data) => {
    response = await Library.create({
        name: data.name,
        city: data.city,
        state: data.state,
        vid: data.vid,
        country: data.country,
        imagePath: data.imagePath,
        private: data.private,
        description: data.description,

    });
    return response;
}

exports.bulkCreate = async (data) => {
    response = await Library.bulkCreate(data);
    return response;
}

exports.select = async (filters = null) => {
    if (!filters) {
        // Primeiro, buscar todas as Libraries
        const libraries = await Library.findAll({
            include: [
                {
                    model: Institute,
                    include: [{ model: Contact }],
                    required: false,
                    //separate: true // evita join complexo
                }
            ]
        });

        // Depois, contar artifacts por Library separadamente
        const results = await Promise.all(
            libraries.map(async lib => {
                const artifactsCount = await ArtifactsLibraries.count({
                    where: { LibraryId: lib.id }
                });
                return { ...lib.toJSON(), artifactsCount };
            })
        );

        return results;
    } else {
        // Caso haja filtros
        return await Library.findAll({ where: filters });
    }
};

exports.selectByUser = async (UserId, res) => {
    try {
        const libraries = await Library.findAll({
            include: [
                {
                    model: UsersLibraries,
                    where: { UserId: UserId },
                },

            ],

        });

        const librariesWithArtifacts = await Promise.all(
            libraries.map(async lib => {
                const artifactsCount = await ArtifactsLibraries.count({
                    where: { LibraryId: lib.id }
                });
                return { ...lib.toJSON(), artifactsCount };
            })
        );
        const institutes = await Institute.findAll({
            include: [{ model: InstitutesUsers, where: { UserId: UserId } }],
        });
        const inviteInstitutes = await Institute.findAll({
            include: [
                {
                    model: InstitutesUsers,
                    required: false, // faz LEFT JOIN
                    where: { UserId } // tenta achar esse usuário
                }
            ],
            where: {
                '$InstitutesUsers.UserId$': null // pega só os que não tem
            }
        });
        const results = { "myInstitutes": institutes, "libraries": librariesWithArtifacts, "inviteInstitutes": inviteInstitutes };
        return results;
    } catch (error) {
        console.error("Erro ao buscar bibliotecas:", error);
        res.status(500).json({ error: "Erro ao buscar bibliotecas." });
    }
};

exports.selectOne = async (filters = null, res) => {
    response = await Library.findOne({
        where: filters,
        include: [{ model: Institute, include: [{ model: Contact }] }, { model: Artifact }]
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await Library.findByPk(data.id);

    tochange.name = data.name ? data.name : tochange.name;
    tochange.country = data.country ? data.country : tochange.country;
    tochange.private = data.private ? data.private : tochange.private;
    tochange.state = data.state ? data.state : tochange.state;
    tochange.vid = data.vid ? data.vid : tochange.vid;
    tochange.city = data.city ? data.city : tochange.city;
    tochange.imagePath = data.imagePath ? data.imagePath : tochange.imagePath;
    tochange.description = data.description ? data.description : tochange.description;

    response = await tochange.save();
    return response;
}

exports.delete = async (data, res) => {
    return Library.destroy({
        where: {
            id: data.id
        }
    });
}