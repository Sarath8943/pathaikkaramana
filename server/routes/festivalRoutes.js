const express = require("express");
const router = express.Router();
const festivalPdfUpload = require("../middlewares/festivalPdfUpload");
const {
  getFestivalData,
  uploadFestivalPdf,
  updateFestivalData,
} = require("../controllers/festivalController");

router.get("/", getFestivalData);
router.post("/upload-pdf", festivalPdfUpload.single("pdf"), uploadFestivalPdf);
router.put("/update", updateFestivalData);

module.exports = router;
