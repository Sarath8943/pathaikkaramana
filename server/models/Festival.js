const mongoose = require('mongoose');

const FestivalSchema = new mongoose.Schema({
  title: String,
  datesInfo: String,
  malayalamDates: String,
  highlightDate: String,
  pdfUrl: String,
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
