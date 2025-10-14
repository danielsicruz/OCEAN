const userController = require("../controllers/userController");
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
    data = req.body;
    if (true) {
        data.password = await bcrypt.hash(data.password, 8);
        // name: data.name ? data.name : null,
        // password: data.password ? data.password : null,
        // email: data.email ? data.email : null,
        // userLevel: data.userLevel ? data.userLevel : null,
        user = await userController.create(data);
        return res.status(201).json({ data });


    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    data = req.body;
    if (data != undefined) {
        filter = {
            name: data.name ? data.name : null,
            password: data.password ? data.password : null,
            email: data.email ? data.email : null,
            userLevel: data.userLevel ? data.userLevel : null,
            created_at: data.created_at ? data.created_at : null,
            updated_at: data.updated_at ? data.updated_at : null,
        }
        user.keys(filter).forEach(key => {
            if (filter[key] == null) {
                delete filter[key];
            }

        });
    }
    if (req.query.filter == undefined) {

        //We should create the 'filter' param to check if have filters and later get
        //all the params to filter the response
        console.log("No filter");
        //rules
        if (true) {
            users = await userController.select(null, res);
            return res.status(200).json(users);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            users = await userController.select(filter, res);
            return res.status(200).json(users);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.getOne = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const response = await userController.selectOne({ id: id }, null);
    if (response) {
        console.log(response);
        return res.status(200).json(response);
    } else {
        return res.status(404).json({ "message": "user not found" });
    }
}

exports.update = async (req, res) => {
    data = req.body;
    data.id = req.params.id;
    //rules
    if (true) {
        user = await userController.update(data);
        return res.status(200).json(user);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}