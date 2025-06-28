const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Netlify Function is running",
    env: process.env.NODE_ENV,
  });
});

// Export the serverless function
exports.handler = serverless(app);
