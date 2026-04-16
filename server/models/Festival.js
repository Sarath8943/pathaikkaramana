// models/Festival.js
const mongoose = require('mongoose');

const FestivalSchema = new mongoose.Schema({
  title: String,             // ഉത്സവങ്ങൾ
  datesInfo: String,         // 2025 നവംബർ 15 മുതൽ...
  malayalamDates: String,    // 1201 കുംഭം...
  highlightDate: String,     // 16 11 2025
  pdfUrl: String,            // PDF ഫയലിന്റെ ലിങ്ക്
  scheduleData: [
    {
      date: String,
      title: String,
      events: [
        { time: String, details: String }
      ]
    }
  ]
});

module.exports = mongoose.model('Festival', FestivalSchema);