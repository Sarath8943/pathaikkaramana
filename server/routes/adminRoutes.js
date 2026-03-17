const express = require("express");
const router = express.Router();

const {
  adminLogin,
  adminLogout,
  adminSignup,
  changeAdminPassword,
  updateProfile,
  getAdminProfile,
} = require("../controllers/adminController");

const verifyAdminToken = require("../utils/verifyAdminToken");
const { upload } = require("../config/cloudinary");

router.post("/signup", adminSignup);
router.post("/login", adminLogin);

router.get("/profile", verifyAdminToken, getAdminProfile);

router.put(
  "/update-profile",
  verifyAdminToken,
  upload.single("profilePic"),
  updateProfile,
);

router.put("/change-password", verifyAdminToken, changeAdminPassword);
router.post("/logout", verifyAdminToken, adminLogout);

module.exports = router;
