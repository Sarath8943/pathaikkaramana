const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    optimizedUrl: { type: String }, 
    thumbnail: { type: String },    
    type: { type: String },
    publicId: { type: String },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);