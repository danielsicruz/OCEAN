const express = require("express");
const {authByUserLevel} = require("./middlewares");
const { route } = require("express/lib/application");
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWTTOKEN;

let router = express.Router();

const authService = require('../services/authService.js');




router.post("/login", authService.login);
router.use(authByUserLevel([1,2,3]));
router.get("/", authService.info);
//router.delete("/:id", clientService.delete)

module.exports = router;