const Media = require("../models/mediaModels");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadMedia = async (req, res) => {
  try {
    const { year } = req.body;

    // പ്രധാനപ്പെട്ട ചെക്ക്: ഫയൽ വരുന്നുണ്ടോ എന്ന് നോക്കുക
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded. Check if the key is 'image'" });
    }

    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "temple_media",
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res.status(500).json({ message: "Cloudinary Upload Failed" });
        }

        const isVideo = result.resource_type === "video";

        // ലളിതമായ URL ട്രാസ്‌ഫോർമേഷൻ
        const transformBase = `/upload/w_800,q_auto,f_auto${isVideo ? ",so_0" : ""}/`;
        const thumbBase = `/upload/w_400,q_auto,f_auto${isVideo ? ",so_0" : ""}/`;

        const optimizedUrl = result.secure_url
          .replace("/upload/", transformBase)
          .replace(/\.[^/.]+$/, isVideo ? ".jpg" : "");

        const thumbnailUrl = result.secure_url
          .replace("/upload/", thumbBase)
          .replace(/\.[^/.]+$/, isVideo ? ".jpg" : "");

        const media = await Media.create({
          url: result.secure_url,
          optimizedUrl: optimizedUrl,
          thumbnail: thumbnailUrl,
          type: result.resource_type,
          publicId: result.public_id,
          year: parseInt(year),
        });

        res.status(200).json(media);
      },
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// getMedia, deleteMedia എന്നിവ നിങ്ങൾ നൽകിയത് പോലെ തന്നെ തുടരാം...
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
