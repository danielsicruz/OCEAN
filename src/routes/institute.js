const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const multer = require("multer");
const path = require("path");
const instituteService = require("../services/instituteService");

const storage = multer.diskStorage({
    destination: './public/images/institutes/',
    filename: function (req, file, cb) {
        const id = req.body.id;
        cb(null, id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('image'), instituteService.create);
router.get("/", instituteService.select);
router.get("/:id", instituteService.getOne);
router.put("/:id", instituteService.update);
//srouter.delete("/:id", instituteService.delete)

module.exports = router;