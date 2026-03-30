const Admin = require("../models/adminModels");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token");
const { cloudinary } = require("../config/cloudinary");

exports.adminSignup = async (req, res) => {
  try {
    const { name, phone, email, password, profileImage } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingAdmin) {
      if (existingAdmin.email === email) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }
      if (existingAdmin.phone === phone) {
        return res.status(400).json({
          message: "Phone number already registered",
        });
      }
    }

    const admin = await Admin.create({
      name,
      phone,
      email,
      password,
      profileImage,
    });

    const token = generateToken(admin._id);

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(201).json({
      message: "Signup successful",
      token: token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("ADMIN SIGNUP ERROR 👉", error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email or phone already exists",
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // 1. ഫീൽഡുകൾ ഉണ്ടോ എന്ന് നോക്കുന്നു
    if ((!email && !phone) || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone/Email and password are required",
      });
    }

    // 2. അഡ്മിനെ കണ്ടെത്തുന്നു
    const query = email ? { email } : { phone };
    const admin = await Admin.findOne(query);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3. പാസ്‌വേഡ് ചെക്ക് ചെയ്യുന്നു
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. ടോക്കൺ ഉണ്ടാക്കുന്നു (id തന്നെയാണോ എന്ന് ഉറപ്പാക്കുക)
    const token = generateToken(admin._id);

    // 5. കുക്കി സെറ്റ് ചെയ്യുന്നു (Cross-domain support-ന് വേണ്ടി)
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true, // Render-ൽ ഇത് നിർബന്ധമാണ് (HTTPS)
      sameSite: "none", // Vercel-ൽ നിന്ന് ആക്സസ് ചെയ്യാൻ ഇത് 'none' ആയിരിക്കണം
      maxAge: 24 * 60 * 60 * 1000, // 1 ദിവസം
    });

    // 6. ഫൈനൽ റെസ്‌പോൺസ്
    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token: token, // ഫ്രണ്ട് എൻഡിൽ sessionStorage-ൽ സേവ് ചെയ്യാൻ
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR 👉", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.adminLogout = (req, res) => {
  try {
    
    res.clearCookie("adminToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "Admin logout successful",
    });
  } catch (error) {
    console.error("ADMIN LOGOUT ERROR 👉", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Old & new password required",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different",
      });
    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const isMatch = await admin.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(401).json({
        message: "Old password incorrect",
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR 👉", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const adminId = req.admin._id;

    let admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const updateData = {
      name: name || admin.name,
      email: email || admin.email,
      phone: phone || admin.phone,
    };

    if (req.file) {
      if (admin.profileImagePublicId) {
        await cloudinary.uploader.destroy(admin.profileImagePublicId);
      }
      updateData.profileImage = req.file.path;
      updateData.profileImagePublicId = req.file.filename;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email or Phone already exists" });
    }
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = req.admin;

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const adminData = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      profileImage: admin.profileImage,
    };

    res.status(200).json({
      success: true,
      admin: adminData, // ഫ്രണ്ട്-എൻഡിലേക്ക് സുരക്ഷിതമായ ഡാറ്റ മാത്രം അയക്കുന്നു
    });
  } catch (error) {
    console.error("GET ADMIN PROFILE ERROR 👉", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
