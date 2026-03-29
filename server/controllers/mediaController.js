const Media = require("../models/mediaModels");
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs"); // അപ്‌ലോഡിന് ശേഷം ഫയൽ ഡിലീറ്റ് ചെയ്യാൻ

// ഇമേജ്/വീഡിയോ വേരിയന്റുകൾ നിർമ്മിക്കാൻ
const buildCloudinaryVariant = (secureUrl, width, isVideo) =>
  secureUrl
    .replace(
      "/upload/",
      `/upload/w_${width},q_auto,f_auto${isVideo ? ",so_0" : ""}/`,
    )
    .replace(/\.[^/.]+$/, isVideo ? ".jpg" : "");

exports.uploadMedia = async (req, res) => {
  try {
    const { year } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File not available." });
    }

    const parsedYear = Number.parseInt(year, 10);
    if (Number.isNaN(parsedYear)) {
      return res.status(400).json({ message: "Year must be a valid number." });
    }

    const isVideo = req.file.mimetype.startsWith("video/");

    // ✅ Cloudinary അപ്‌ലോഡ് (Disk Path ഉപയോഗിക്കുന്നു)
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // വീഡിയോ/ഇമേജ് തനിയെ തിരിച്ചറിയും
      folder: "temple_media",
      ...(isVideo ? { chunk_size: 6000000 } : {}) // വലിയ വീഡിയോകൾക്ക്
    });

    // ✅ അപ്‌ലോഡ് കഴിഞ്ഞാൽ സെർവറിലെ ടെമ്പററി ഫയൽ ഡിലീറ്റ് ചെയ്യുക
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const optimizedUrl = buildCloudinaryVariant(uploadResult.secure_url, 800, isVideo);
    const thumbnailUrl = buildCloudinaryVariant(uploadResult.secure_url, 400, isVideo);

    const media = await Media.create({
      url: uploadResult.secure_url,
      optimizedUrl,
      thumbnail: thumbnailUrl,
      type: uploadResult.resource_type,
      publicId: uploadResult.public_id,
      year: parsedYear,
    });

    res.status(200).json(media);
  } catch (error) {
    // എറർ വന്നാലും താൽക്കാലിക ഫയൽ ഡിലീറ്റ് ചെയ്യണം
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Media upload error:", error);
    res.status(500).json({ message: error.message || "Upload failed.." });
  }
};
exports.getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: "Media not found" });

    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type || "image",
    });

    await media.deleteOne();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
