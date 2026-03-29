const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "temple_gallery", 
    resource_type: "auto", // 👈 ഇത് പ്രധാനമാണ്! എങ്കിലേ വീഡിയോ വർക്ക് ആകൂ.
    allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov"], // വീഡിയോ ഫോർമാറ്റുകളും ചേർത്തു
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

module.exports = { cloudinary, upload };