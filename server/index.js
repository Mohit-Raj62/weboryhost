require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();

// CORS configuration - More permissive for Render
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://webory.netlify.app",
  "https://*.netlify.app",
  "https://webory.onrender.com",
  "https://*.onrender.com",
  // Add your production frontend URL here
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.endsWith(".netlify.app") ||
      origin.endsWith(".onrender.com") ||
      process.env.NODE_ENV === "development"
    ) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Security headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );
  next();
});

// Health check endpoint (should be before static files)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    cors: {
      origin: req.headers.origin,
      allowed:
        allowedOrigins.includes(req.headers.origin) ||
        req.headers.origin?.endsWith(".netlify.app") ||
        req.headers.origin?.endsWith(".onrender.com"),
    },
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Serve static files (only in production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// Centralized error handler
app.use(errorHandler);

// 404 handler (should be last)
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
    details: `The requested endpoint ${req.method} ${req.originalUrl} does not exist`,
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
    // Start server
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log("CORS enabled for origins:", allowedOrigins);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Remove the problematic fetch call that was causing issues
// const API_BASE_URL = "https://webory.onrender.com/api";
// fetch("https://webory.onrender.com/api/health")
//   .then((res) => res.json())
//   .then((data) => console.log("Backend connected:", data));
