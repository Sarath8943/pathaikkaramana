const express = require("express");
const router = express.Router();

const {
  adminLogin,
  adminLogout,
  adminSignup,
  changeAdminPassword,
} = require("../controllers/adminController");

const verifyAdminToken = require("../utils/verifyAdminToken");

router.post("/signup", adminSignup);
router.post("/login", adminLogin);

router.put("/change-password", verifyAdminToken, changeAdminPassword);
router.post("/logout", verifyAdminToken, adminLogout);

module.exports = router;
