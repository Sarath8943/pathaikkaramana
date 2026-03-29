const multer = require("multer");

const storage = multer.diskStorage({}); // ഇത് ഫയലിനെ RAM-ൽ വെക്കാതെ ഡിസ്കിലേക്ക് മാറ്റും

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Images and videos only!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter,
});

module.exports = upload;