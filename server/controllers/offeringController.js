const Offering = require("../models/offeringModels");
const { cloudinary } = require("../config/cloudinary");

const sanitizeOfferingPayload = (payload = {}) => ({
  title: {
    ml: payload?.title?.ml?.trim?.() || "",
    en: payload?.title?.en?.trim?.() || "",
  },
  image: payload?.image?.trim?.() || "",
  small: Boolean(payload?.small),
  items: Array.isArray(payload?.items)
    ? payload.items.map((item) => ({
        name_ml: item?.name_ml?.trim?.() || "",
        name_en: item?.name_en?.trim?.() || "",
        price: Number(item?.price),
      }))
    : [],
});

const validateOfferingPayload = (payload = {}) => {
  if (!payload.title?.ml || !payload.title?.en) {
    return "Both Malayalam and English titles are required";
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return "At least one offering item is required";
  }

  for (const item of payload.items) {
    if (!item.name_ml || !item.name_en) {
      return "All items must contain Malayalam and English names";
    }

    if (Number.isNaN(item.price) || item.price < 0) {
      return "Each item must contain a valid price";
    }
  }

  return "";
};

exports.uploadOfferingImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select an image file." });
    }

    if (!req.file.mimetype || !req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Only image files are allowed." });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "temple_offerings",
          resource_type: "image",
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
      stream.end(req.file.buffer);
    });

    if (!uploadResult?.secure_url) {
      return res.status(500).json({ message: "Image upload failed." });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    console.error("Offering image upload error:", error);
    res.status(500).json({
      message: error.message || "Could not upload offering image.",
    });
  }
};

exports.getAllOfferings = async (req, res) => {
  try {
    const offerings = await Offering.find().sort({ createdAt: 1 });
    res.status(200).json(offerings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOffering = async (req, res) => {
  try {
    const payload = sanitizeOfferingPayload(req.body);
    const validationError = validateOfferingPayload(payload);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const newOffering = new Offering(payload);
    await newOffering.save();
    res.status(201).json(newOffering);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOffering = async (req, res) => {
  try {
    const payload = sanitizeOfferingPayload(req.body);
    const validationError = validateOfferingPayload(payload);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const updated = await Offering.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Offering not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOffering = async (req, res) => {
  try {
    const deleted = await Offering.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Offering not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
