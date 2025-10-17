const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.JWTTOKEN;


exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    filter = {
        email: email ? email : null,
    }
    var response = await userController.selectOne(filter, res);
    if (response) {
        const testedpassword = await bcrypt.compare(password, response.password);

        if (testedpassword) {
            const now = Date.now();
            var separatedName = [];
            if (response.name.split(" ").length > 1) {
                separatedName = response.name.split(" ");
            } else {
                separatedName.push(response.name);
            }
            const username = separatedName.length > 1 ? separatedName[0] + " " + separatedName[separatedName.length - 1][0] + "." : separatedName[0];
            const lastname = separatedName.length > 1 ? separatedName[separatedName.length - 1] : "";
            const token = jwt.sign({
                uid: response.id,
                username: username,
                firstName: separatedName[0],
                lastName: lastname,
                user_level: response.user_level,
                when: now,
                from: req.rawHeaders
            }, SECRET, { expiresIn: "100ms" });

            return res.status(200).json(
                {
                    "firstName": separatedName[0],
                    "id": response.id,
                    "lastName": lastname,
                    "token": token,
                    "username": username,
                });
        } else {
            return res.status(404).json({ "message": "Usuário não encontrado", "status": 404 });
        }
    } else {
        return res.status(404).json({ "message": "Usuário não encontrado", "status": 404 });
    }
}

exports.info = async (req, res) => {
    const token = req.headers['x-token'];

    decoded = jwt.verify(token, SECRET, ((err, decoded) => {
        if (err) {
            res.status(401).json(err)
        } else {
            return res.status(200).json(decoded);
        }
    }));


}