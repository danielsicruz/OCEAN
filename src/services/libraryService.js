const libraryController = require("../controllers/libraryController");
const institutesUsersController = require("../controllers/institutesUsersController");
const usersLibrariesController = require("../controllers/usersLibrariesController");
const librariesInstitutesController = require("../controllers/librariesInstitutesController");
const artifactController = require("../controllers/artifactController")
const { Op } = require("sequelize");

exports.create = async (req, res) => {
    data = req.body;
    myInstitutes = await institutesUsersController.select({ InstituteId: { [Op.or]: data.myInstitutes } }, res);
    data.id = null;
    const sendInvitestoInstitutes = [];
    const inscribedInstitutes = myInstitutes
        .filter(ins => ins.userLevel >= 2 && ins.UserId === req.userData.uid)
        .map(ins => ins.InstituteId);
    data.inviteInstitutes.push(myInstitutes
        .filter(ins => ins.userLevel < 2 && ins.UserId === req.userData.uid)
        .map(ins => ins.InstituteId));

    inviteInstitutes = await institutesUsersController.select({ InstituteId: { [Op.or]: data.inviteInstitutes }, userLevel: { [Op.gt]: 2 } }, res);


    sendInvitestoInstitutes.push(...inviteInstitutes.map(ins => ins));


    if (true) {
        const library = await libraryController.create(data);
        const libraryId = library.id || library.dataValues?.id;
        const libraryInstitutes = await librariesInstitutesController.bulkCreate(inscribedInstitutes.map(ins => {
            return {
                LibraryId: libraryId,
                InstituteId: ins,
                userLevel: 4,
            }
        }));
        const userLibrary = await usersLibrariesController.create({
            UserId: req.userData.uid,
            LibraryId: libraryId,
            userLevel: 4,
        });
        console.log(libraryId)
        const response = { "library": library, "userLibrary": userLibrary, "institutes": libraryInstitutes, "peindingInstitutes": sendInvitestoInstitutes };

        return res.status(201).json(response);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    data = req.body;
    console.log(data);
    let library = [];
    if (data != undefined) {
        filter = {
            name: data.name ? data.name : null,
            city: data.city ? data.city : null,
            state: data.state ? data.state : null,
            country: data.country ? data.country : null,
            private: data.private ? data.private : null,
            created_at: data.created_at ? data.created_at : null,
            updated_at: data.updated_at ? data.updated_at : null,
        }
        library.keys(filter).forEach(key => {
            if (filter[key] == null) {
                delete filter[key];
            }

        });
    } else {
        filter = undefined;
    }
    if (req.query.filter == undefined) {

        //We should create the 'filter' param to check if have filters and later get
        //all the params to filter the response
        console.log("No filter");
        //rules
        if (true) {
            libraries = await libraryController.select(null, res);
            return res.status(200).json(libraries);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            libraries = await libraryController.select(filter, res);
            return res.status(200).json(libraries);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.selectByUser = async (req, res) => {
    data = req.userData;
    if (data != undefined) {
        //rules
        if (true) {

            const libraries = await libraryController.selectByUser(data.uid, res);
            return res.status(200).json(libraries);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.getOne = async (req, res) => {
    const id = req.params.id;
    const response = await libraryController.selectOne({ id: id }, null);
    if (response) {
        return res.status(200).json(response);
    } else {
        return res.status(404).json({ "message": "library not found" });
    }
}

exports.update = async (req, res) => {
    data = req.body;
    data.id = req.params.id;
    //rules
    if (true) {
        library = await libraryController.update(data);

        return res.status(200).json(library);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}
exports.delete = async (req, res) => {
    const id = req.params.id
    library = await libraryController.selectToDelete({ id: id });
    artifacts = library.Artifacts;
    const queryBuilder = [];
    artifacts.map((artifact) => {
        queryBuilder.push(artifact.id)
    });
    deletedArtifacts = await artifactController.delete(queryBuilder);
    deletedLibrary = await libraryController.delete(id);
    return res.status(201).json({ "deletedArtifacts": deletedArtifacts, "deletedLibrary": deletedLibrary });


}