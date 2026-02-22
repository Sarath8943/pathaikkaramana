const express = require("express");
const router = express.Router();

const { uploadMedia, getMedia , deleteMedia } = require("../controllers/mediaController");
const upload = require("../middlewares/upload");
const { updateSearchIndex } = require("../models/mediaModels");

router.post("/upload", upload.single("file"), uploadMedia);
router.delete("/:id", deleteMedia);
router.get("/", getMedia);

module.exports = router;
