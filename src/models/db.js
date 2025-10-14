const Sequelize = require('sequelize');
require('dotenv').config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;

const componenteSequelize = new Sequelize(database, user, password,
    {
        dialect: 'mariadb', host: host, port:3310, timezone:"-03:00"
    });
module.exports = componenteSequelize;