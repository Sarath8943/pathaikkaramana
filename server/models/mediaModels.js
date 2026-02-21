const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: { type: String },
    publicId: { type: String },
    year: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Media", mediaSchema);
