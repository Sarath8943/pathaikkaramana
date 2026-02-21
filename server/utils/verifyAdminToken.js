const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModels");

const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized: Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error("VERIFY ADMIN TOKEN ERROR 👉", err);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = verifyAdminToken;
