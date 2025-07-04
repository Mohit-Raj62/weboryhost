const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { initializeChat } = require("./controllers/chatbotController");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const clientRoutes = require("./routes/clientRoutes");
const path = require("path");

const app = express();
const server = http.createServer(app);
require("dotenv").config();

// Set default JWT_SECRET if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "webory_admin_secret_key_2024_very_secure_and_long";
  console.log("⚠️  Using default JWT_SECRET (not recommended for production)");
}

const io = new Server(server, {
  cors: {
    origin: true, // Allow all origins temporarily
    methods: ["GET", "POST"],
  },
});

// Check for required environment variables
const requiredEnvVars = ["MONGODB_URI"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    "Missing required environment variables:",
    missingEnvVars.join(", ")
  );
  process.exit(1);
}

// Middleware
app.use(
  cors({
    origin: true, // Allow all origins temporarily
    credentials: false, // Changed to false for cross-origin requests
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  req.startTime = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, {
    body: req.body,
    query: req.query,
    headers: req.headers,
  });
  next();
});

// Serve static files (including favicon.ico)
app.use(express.static("public"));

// Remove frontend serving since it's deployed separately on Netlify
// app.use(express.static(path.join(__dirname, "../client/dist")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", jobApplicationRoutes);
app.use("/api/clients", clientRoutes);

// Test route for debugging
app.get("/api/test", (req, res) => {
  res.json({
    message: "Test route working",
    timestamp: new Date().toISOString(),
    headers: req.headers,
  });
});

// Root route - API information
app.get("/", (req, res) => {
  res.json({
    message: "Webory Backend API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      health: "/api/health",
    },
    frontend: "Deployed separately on Netlify",
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    env: process.env.NODE_ENV,
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// 404 handler
app.use((req, res, next) => {
  console.log("404 Not Found:", req.method, req.path);
  res.status(404).json({
    message: "Not Found",
    details: `The requested endpoint ${req.method} ${req.path} does not exist`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", {
    name: err.name,
    message: err.message,
    stack: err.stack,
    code: err.code,
  });

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired",
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate Error",
      details: "A record with this information already exists",
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Initialize chat
initializeChat(io);

// --- Socket.IO Real-Time Project Management Events ---
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // Join project room
  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`Socket ${socket.id} joined project ${projectId}`);
  });

  // Leave project room
  socket.on("leaveProject", (projectId) => {
    socket.leave(projectId);
    console.log(`Socket ${socket.id} left project ${projectId}`);
  });

  // Project updated
  socket.on("projectUpdated", (project) => {
    io.to(project._id).emit("projectUpdated", project);
  });

  // Task updated
  socket.on("taskUpdated", ({ projectId, task }) => {
    io.to(projectId).emit("taskUpdated", task);
  });

  // New comment
  socket.on("commentAdded", ({ projectId, comment }) => {
    io.to(projectId).emit("commentAdded", comment);
  });

  // New file
  socket.on("fileAdded", ({ projectId, file }) => {
    io.to(projectId).emit("fileAdded", file);
  });

  // Activity log
  socket.on("activityLogged", ({ projectId, log }) => {
    io.to(projectId).emit("activityLogged", log);
  });

  // Notifications (task assignment, deadline, etc.)
  socket.on("notify", ({ projectId, notification }) => {
    io.to(projectId).emit("notification", notification);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5002;

// Database connection and server start
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);

    // Start server after MongoDB connection
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

module.exports = app;
