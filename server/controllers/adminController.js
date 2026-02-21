const Admin = require("../models/adminModels");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token");

exports.adminSignup = async (req, res) => {
  try {
    const { name, phone, email, password, profileImage } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingAdmin) {
      if (existingAdmin.email === email) {
        return res.status(400).json({ message: "Email already registered" });
      }
      if (existingAdmin.phone === phone) {
        return res
          .status(400)
          .json({ message: "Phone number already registered" });
      }
    }

    const admin = await Admin.create({
      name,
      phone,
      email,
      password,
      profileImage,
    });

    res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email or phone already exists",
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if ((!phone && !email) || !password) {
      return res.status(400).json({
        message: "Phone or email and password required",
      });
    }

    const admin = await Admin.findOne({
      $or: [{ phone }, { email }],
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid phone/email or password",
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid phone/email or password",
      });
    }

    const token = generateToken(admin._id);

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Admin login successful",
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.adminLogout = (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      message: "Admin logout successful",
    });
  } catch (error) {
    console.error("ADMIN LOGOUT ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old & new password required" });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await admin.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password incorrect" });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
