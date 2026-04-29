const express = require("express");
const router = express.Router();
const offeringCtrl = require("../controllers/offeringController");
const adminAuth = require("../middlewares/adminAuth");
const upload = require("../middlewares/upload");

router.get("/", offeringCtrl.getAllOfferings);
router.post(
  "/upload-image",
  adminAuth,
  upload.single("file"),
  offeringCtrl.uploadOfferingImage,
);
router.post("/", adminAuth, offeringCtrl.createOffering);
router.put("/:id", adminAuth, offeringCtrl.updateOffering);
router.delete("/:id", adminAuth, offeringCtrl.deleteOffering);

module.exports = router;
