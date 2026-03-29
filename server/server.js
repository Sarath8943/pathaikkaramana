const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 5000;

// ✅ മാറ്റം 1: വീഡിയോകൾക്കായി ബോഡി ലിമിറ്റ് 100MB ആക്കി വർദ്ധിപ്പിച്ചു
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://templeadmin.vercel.app",
      "https://pathaikkaramana.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/media", mediaRoutes);

app.get("/", (req, res) => {
  res.send("API Running (Production Ready Version)");
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint does not exist" });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  // Render Logs-ൽ കൃത്യമായ എറർ കാണാൻ ഇത് സഹായിക്കും
  console.error("Server Error Details:", err); 

  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "File is too large. Maximum upload size is 100MB."
        : err.message;

    return res.status(status).json({ message });
  }

  // മറ്റ് എററുകൾക്ക് കൃത്യമായ മെസ്സേജ് അയക്കുക
  res.status(err.status || 500).json({ 
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err : {} 
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});