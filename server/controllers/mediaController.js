const Media = require("../models/mediaModels");
const { cloudinary } = require("../config/cloudinary");

const buildCloudinaryVariant = (secureUrl, width, isVideo) =>
  secureUrl
    .replace(
      "/upload/",
      `/upload/w_${width},q_auto,f_auto${isVideo ? ",so_0" : ""}/`,
    )
    .replace(/\.[^/.]+$/, isVideo ? ".jpg" : "");

const uploadBufferToCloudinary = (buffer, resourceType) =>
  new Promise((resolve, reject) => {
    const streamFactory =
      resourceType === "video"
        ? cloudinary.uploader.upload_chunked_stream
        : cloudinary.uploader.upload_stream;

    const stream = streamFactory.call(
      cloudinary.uploader,
      {
        resource_type: resourceType,
        folder: "temple_media",
        ...(resourceType === "video" ? { chunk_size: 6 * 1024 * 1024 } : {}),
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    stream.on("error", reject);
    stream.end(buffer);
  });

exports.uploadMedia = async (req, res) => {
  try {
    const {
      CLOUDINARY_NAME,
      CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET,
    } = process.env;
    const { year } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded. Make sure the form field name is 'file'.",
      });
    }

    if (!req.file.buffer || !req.file.mimetype) {
      return res.status(400).json({
        message: "Uploaded file data is invalid or incomplete.",
      });
    }

    if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return res.status(500).json({
        message: "Cloudinary configuration is missing on the server.",
      });
    }

    if (!year) {
      return res.status(400).json({ message: "Year is required." });
    }

    const parsedYear = Number.parseInt(year, 10);
    if (Number.isNaN(parsedYear)) {
      return res.status(400).json({ message: "Year must be a valid number." });
    }

    const resourceType = req.file.mimetype.startsWith("video/")
      ? "video"
      : "image";

    const uploadResult = await uploadBufferToCloudinary(
      req.file.buffer,
      resourceType,
    );

    if (!uploadResult?.secure_url || !uploadResult?.public_id) {
      throw new Error("Cloudinary upload did not return the expected file data.");
    }

    const isVideo = uploadResult.resource_type === "video";
    const optimizedUrl = buildCloudinaryVariant(
      uploadResult.secure_url,
      800,
      isVideo,
    );
    const thumbnailUrl = buildCloudinaryVariant(
      uploadResult.secure_url,
      400,
      isVideo,
    );

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
    console.error("Media upload error:", error);
    res.status(500).json({
      message: error.message || "Media upload failed on the server.",
    });
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
