const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-live-domain.com", // Your deployed frontend domain
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  }),
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

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Server Error", error: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
