require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const generateRoute = require("./routes/generate");

const app = express();
const PORT = process.env.PORT || 5000;

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Serve uploads
// =======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// ✅ SERVE FRONTEND
// =======================

// go OUT of backend → into frontend
const frontendPath = path.join(__dirname, "..", "frontend");

// serve all frontend files
app.use(express.static(frontendPath));

// load index.html at localhost:5000
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// =======================
// API Routes
// =======================
app.use("/generate", generateRoute);

// =======================
// Start Server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Holord running at http://localhost:${PORT}`);
});
