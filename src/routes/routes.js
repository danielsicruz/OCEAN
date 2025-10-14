const express = require('express');
const router = express.Router();

const artifact = require("./artifact")
const institute = require("./institute")
const library = require("./library")
const user = require("./user")
const auth = require("./auth")

router.use('/v1/artifact', artifact);
router.use('/v1/institute', institute);
router.use('/v1/library', library);
router.use('/v1/user', user);
router.use('/v1/auth', auth);

module.exports = router;