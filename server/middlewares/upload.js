const multer = require("multer");

// Memory Storage ഉപയോഗിക്കുക. 
// അപ്പോൾ മാത്രമേ Controller-ൽ upload_stream ഉപയോഗിക്കാൻ കഴിയൂ.
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB വരെ മാത്രം
  }
});

module.exports = upload; // ഇതാണ് ശരിയായ രീതി