const cloudinary = require("../config/cloudinary");
const Media = require("../models/mediaModels");

exports.uploadMedia = async (req, res) => {
  try {
    console.log("BODY 👉", req.body);
    console.log("YEAR 👉", req.body.year);

    const { year } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    if (!year) return res.status(400).json({ message: "Year is required" });

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "temple_media" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        const media = await Media.create({
          url: result.secure_url,
          type: result.resource_type,
          publicId: result.public_id,
          year: parseInt(year),
        });

        res.status(200).json(media);
      },
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type || "image",
    });

    await media.deleteOne();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
