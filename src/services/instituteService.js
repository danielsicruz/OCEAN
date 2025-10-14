const instituteController = require("../controllers/instituteController");

exports.create = async (req, res) => {
    data = req.body;
    if (true) {
        institute = await instituteController.create(data);
        return res.status(201).json(institute);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    data = req.body;
    filter = {
        name: data.name ? data.name : null,
        country: data.country ? data.country : null,
        state: data.state ? data.state : null,
        city: data.city ? data.city : null,
        address: data.address ? data.address : null,
        number: data.number ? data.number : null,
        created_at: data.created_at ? data.created_at : null,
        updated_at: data.updated_at ? data.updated_at : null,
    }
    institute.keys(filter).forEach(key => {
        if (filter[key] == null) {
            delete filter[key];
        }

    });

    if (req.query.filter == undefined) {

        //We should create the 'filter' param to check if have filters and later get
        //all the params to filter the response
        console.log("No filter");
        //rules
        if (true) {
            institutes = await instituteController.select(null, res);
            return res.status(200).json(institutes);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            institutes = await instituteController.select(filter, res);
            return res.status(200).json(institutes);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.getOne = async (req, res) => {
    const id = req.params.id;
    const response = await instituteController.selectOne({ id: id }, null);
    if (response) {
        return res.status(200).json(response);
    } else {
        return res.status(404).json({ "message": "institute not found" });
    }
}

exports.update = async (req, res) => {
    data = req.body;
    data.id = req.params.id;
    //rules
    if (true) {
        institute = await instituteController.update(data);
        return res.status(200).json(institute);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}