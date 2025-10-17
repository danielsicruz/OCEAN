const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const multer = require("multer");
const path = require("path");
const libraryService = require("../services/libraryService");
const {checkUserData} = require("./middlewares")

const storage = multer.diskStorage({
    destination: './public/images/librarys/',
    filename: function (req, file, cb) {
        const id = req.body.id;
        cb(null, id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/", checkUserData(), libraryService.create);
router.get("/", libraryService.select);
router.get("/myLibraries", checkUserData() ,libraryService.selectByUser);
router.get("/:id", libraryService.getOne);
router.put("/:id", libraryService.update);
//srouter.delete("/:id", libraryService.delete)

module.exports = router;