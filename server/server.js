const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const festivalRoutes = require("./routes/festivalRoutes");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 5000;

// 1. Body Parsers & Cookie Parser
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

// 2. ✅ CORRECT CORS MANUAL MIDDLEWARE (ഇത് കൃത്യമായി കോപ്പി ചെയ്യുക)
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://templeadmin.vercel.app",
    "https://pathaikkaramana.vercel.app"
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // OPTIONS (Preflight) റിക്വസ്റ്റ് വരുമ്പോൾ ഉടൻ മറുപടി നൽകുക
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// 3. Static Folder
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

// 4. Database Connection
connectDB();

// 5. Routes (CORS-ന് താഴെ മാത്രം നൽകുക)
app.use("/api/admin", adminRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/festival", festivalRoutes);

app.get("/", (req, res) => {
  res.send("API Running - CORS Fixed Version");
});

// 6. Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({ 
    message: err.message || "Internal Server Error"
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
