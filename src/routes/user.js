const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const multer = require("multer");
const path = require("path");
const userService = require("../services/userService");

router.post("/", userService.create);
//router.get("/", userService.select);
router.get("/:id", userService.getOne);
router.put("/:id", userService.update);
//srouter.delete("/:id", userService.delete)

module.exports = router;