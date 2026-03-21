const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
  quiet: true,
});

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        "MONGO_URI is not defined. Check server/.env and your runtime environment.",
      );
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
