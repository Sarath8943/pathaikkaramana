const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModels");

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded?.id) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        message: "Admin not found",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    console.error("ADMIN AUTH ERROR 👉", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = adminAuth;