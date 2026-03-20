const express = require("express");
const router = express.Router();

const {
  uploadMedia,
  getMedia,
  deleteMedia,
} = require("../controllers/mediaController");

const upload = require("../middlewares/upload");

// ⚠️ ഫ്രണ്ട് എൻഡിൽ 'file' എന്ന് നൽകിയത് കൊണ്ട് ഇവിടെയും 'file' എന്ന് തന്നെ വേണം
router.post("/upload", upload.single("file"), uploadMedia);

router.delete("/:id", deleteMedia);
router.get("/", getMedia);

module.exports = router;