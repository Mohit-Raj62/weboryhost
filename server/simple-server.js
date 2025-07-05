require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// CORS
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Simple server running" });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Test route working",
    timestamp: new Date().toISOString(),
  });
});

// Visitor routes
app.get("/api/visitor/visitor-count", (req, res) => {
  res.json({ success: true, count: 0, message: "Visitor count route working" });
});

app.get("/api/visitor/visit-stats", (req, res) => {
  res.json({
    success: true,
    daily: 0,
    monthly: 0,
    message: "Visit stats route working",
  });
});

app.get("/api/visitor/visit-stats-daily", (req, res) => {
  res.json({
    success: true,
    dailyCounts: [],
    message: "Daily stats route working",
  });
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in environment variables.");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`Simple server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
