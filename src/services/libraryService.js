const libraryController = require("../controllers/libraryController");

exports.create = async (req, res) => {
    data = req.body;
    if (true) {
        library = await libraryController.create(data);
        return res.status(201).json(library);
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