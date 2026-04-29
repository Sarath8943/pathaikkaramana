const mongoose = require("mongoose");

const offeringSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true }, // ഉദാ: "Bhagavathy"
    ml: { type: String, required: true }  // ഉദാ: "ഭഗവതി"
  },
  image: { type: String }, // ഐക്കൺ ഇമേജ് പാത്ത്
  items: [
    {
      name_en: String, // "Neypayasam"
      name_ml: String, // "നെയ്പ്പായസം"
      price: Number    // 150
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Offering", offeringSchema);