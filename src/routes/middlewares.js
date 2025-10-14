const Users = require('../models/mUser'); // Adjust the path as needed
const jwt = require('jsonwebtoken');
/**
 * Middleware to authorize by userLevel.
 * @param {number|string|array} allowedLevels - Allowed userLevel(s)
 */
function authByUserLevel(allowedLevels) {
    return async function (req, res, next) {
        try {
            const token = req.headers['x-token'];
            decoded = jwt.decode(token);
            const userId = decoded && decoded.uid;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized: No user ID' });
            }

            const user = await Users.findByPk(userId);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: User not found' });
            }

            const levels = Array.isArray(allowedLevels) ? allowedLevels : [allowedLevels];
            if (!levels.includes(user.userLevel)) {
                return res.status(403).json({ message: 'Forbidden: Insufficient user level' });
            }

            next();
        } catch (err) {
            next(err);
        }
    };
}

function checkUserData() {
    return async function (req, res, next) {
        try {
            const cookieHeader = req.headers.cookie
            if (!cookieHeader){
                return res.status(500).json({message: "Couldn't read token, please check if cookies ar enabled"})
            }
            const cookies = Object.fromEntries(
                cookieHeader.split(";").map((cookie) => {
                    const [key, value] = cookie.trim().split("=");
                    return [key, decodeURIComponent(value)];
                })
            );
            const token = cookies["x-token"];

            const userData = jwt.decode(token);
            const updatedUser = userData != null ? await Users.findByPk(userData.uid) : undefined;
            if (updatedUser) {
                req.userData = userData;
                next();
            } else {
                return res.status(404).json({ message: 'User not found, try to login again' })
            }
        } catch (err) {
            next(err);
        }
    };

}


module.exports = {
    authByUserLevel,
    checkUserData,
};