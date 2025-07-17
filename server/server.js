const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { initializeChat } = require("./controllers/chatbotController");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const clientRoutes = require("./routes/clientRoutes");
const supportTicketRoutes = require("./routes/supportTicketRoutes");
const path = require("path");
const Settings = require("./models/Settings");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();
const server = http.createServer(app);
require("dotenv").config();

// Enhanced error handling and monitoring
let serverStartTime = Date.now();
let requestCount = 0;
let errorCount = 0;

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

const allowedOrigins = [
  "https://webory.netlify.app",
  "https://webory.onrender.com",
  "http://localhost:3001", // Allow local frontend for development
];

// Enhanced CORS with better error handling
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies/auth headers if needed
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
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(helmet());

// Enhanced rate limiting with better error handling
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 120, // limit each IP to 120 requests per windowMs
  message: {
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: "Too many requests, please try again later.",
    });
  },
});

// Apply rate limiter to all requests
app.use(limiter);

// Strict rate limiter for login endpoint (5 requests per minute per IP)
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: {
    error: "Too many login attempts, please try again in a minute.",
  },
  handler: (req, res) => {
    console.log(`Login rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: "Too many login attempts, please try again in a minute.",
    });
  },
});
app.use("/api/auth/login", loginLimiter);

// Enhanced request logging middleware with error tracking
app.use((req, res, next) => {
  req.startTime = Date.now();
  requestCount++;

  // Add response monitoring
  const originalSend = res.send;
  res.send = function (data) {
    const responseTime = Date.now() - req.startTime;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${
        res.statusCode
      } (${responseTime}ms)`,
      {
        body: req.body,
        query: req.query,
        userAgent: req.headers["user-agent"],
        ip: req.ip,
      }
    );
    return originalSend.call(this, data);
  };

  next();
});

// Serve static files (including favicon.ico)
app.use(express.static("public"));

// Routes with error handling
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", jobApplicationRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/support-tickets", supportTicketRoutes);

// Enhanced test route for debugging
app.get("/api/test", (req, res) => {
  res.json({
    message: "Test route working",
    timestamp: new Date().toISOString(),
    serverUptime: Date.now() - serverStartTime,
    requestCount,
    errorCount,
    memoryUsage: process.memoryUsage(),
    headers: req.headers,
  });
});

// Enhanced root route - API information
app.get("/", (req, res) => {
  res.json({
    message: "Webory Backend API",
    version: "1.0.0",
    status: "running",
    uptime: Date.now() - serverStartTime,
    requestCount,
    errorCount,
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      health: "/api/health",
      test: "/api/test",
    },
    frontend: "Deployed separately on Netlify",
  });
});

// Enhanced health check endpoint
app.get("/api/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  const memoryUsage = process.memoryUsage();

  res.json({
    status: "ok",
    message: "Server is running",
    env: process.env.NODE_ENV,
    db: dbStatus,
    uptime: Date.now() - serverStartTime,
    requestCount,
    errorCount,
    memoryUsage: {
      rss: Math.round(memoryUsage.rss / 1024 / 1024) + "MB",
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + "MB",
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + "MB",
    },
  });
});

// Health check endpoint for Render
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Enhanced maintenance mode middleware with better error handling
app.use(async (req, res, next) => {
  try {
    const settings = await Settings.findOne();
    if (
      settings &&
      settings.maintenanceMode &&
      !req.path.startsWith("/api/admin") &&
      !req.path.startsWith("/api/health")
    ) {
      return res
        .status(503)
        .send("Site is under maintenance. Please check back later.");
    }
    next();
  } catch (e) {
    console.error("Error checking maintenance mode:", e);
    // Continue without maintenance check if there's an error
    next();
  }
});

// Enhanced 404 handler
app.use((req, res, next) => {
  console.log("404 Not Found:", req.method, req.path);
  res.status(404).json({
    message: "Not Found",
    details: `The requested endpoint ${req.method} ${req.path} does not exist`,
  });
});

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  errorCount++;
  console.error("Error:", {
    name: err.name,
    message: err.message,
    stack: err.stack,
    code: err.code,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
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

// Initialize chat with error handling
try {
  initializeChat(io);
} catch (error) {
  console.error("Error initializing chat:", error);
}

// Enhanced Socket.IO Real-Time Project Management Events with error handling
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // Join project room
  socket.on("joinProject", (projectId) => {
    try {
      socket.join(projectId);
      console.log(`Socket ${socket.id} joined project ${projectId}`);
    } catch (error) {
      console.error("Error joining project:", error);
    }
  });

  // Leave project room
  socket.on("leaveProject", (projectId) => {
    try {
      socket.leave(projectId);
      console.log(`Socket ${socket.id} left project ${projectId}`);
    } catch (error) {
      console.error("Error leaving project:", error);
    }
  });

  // Project updated
  socket.on("projectUpdated", (project) => {
    try {
      io.to(project._id).emit("projectUpdated", project);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  });

  // Task updated
  socket.on("taskUpdated", ({ projectId, task }) => {
    try {
      io.to(projectId).emit("taskUpdated", task);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  });

  // New comment
  socket.on("commentAdded", ({ projectId, comment }) => {
    try {
      io.to(projectId).emit("commentAdded", comment);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  });

  // New file
  socket.on("fileAdded", ({ projectId, file }) => {
    try {
      io.to(projectId).emit("fileAdded", file);
    } catch (error) {
      console.error("Error adding file:", error);
    }
  });

  // Activity log
  socket.on("activityLogged", ({ projectId, log }) => {
    try {
      io.to(projectId).emit("activityLogged", log);
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  });

  // Notifications (task assignment, deadline, etc.)
  socket.on("notify", ({ projectId, notification }) => {
    try {
      io.to(projectId).emit("notification", notification);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });

  // Handle socket errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

const PORT = process.env.PORT || 5002;

// Enhanced database connection and server start with retry logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(
        process.env.MONGODB_URI ||
          "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          bufferCommands: false,
        }
      );

      console.log("✅ Connected to MongoDB");
      console.log("Database:", mongoose.connection.name);
      console.log("Host:", mongoose.connection.host);
      return true;
    } catch (error) {
      console.error(
        `❌ MongoDB connection attempt ${i + 1} failed:`,
        error.message
      );
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("Failed to connect to MongoDB after all retries");
        return false;
      }
    }
  }
};

// Enhanced server startup
const startServer = async () => {
  try {
    const dbConnected = await connectWithRetry();

    if (!dbConnected) {
      console.error("Cannot start server without database connection");
      process.exit(1);
    }

    // Start server only on Render or production
    if (process.env.NODE_ENV === "production" || process.env.RENDER) {
      server.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(`Health check: http://localhost:${PORT}/api/health`);
        console.log(`Server started at: ${new Date().toISOString()}`);
      });
    } else {
      console.log(
        "Server is not running locally. It will only run on Render (production).\nSet NODE_ENV=production to run locally if needed."
      );
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

// Enhanced process event handlers
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  // Don't exit immediately, log the error and continue
  errorCount++;
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  // Log the error but don't exit immediately
  errorCount++;
});

process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    mongoose.connection.close(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  });
});

process.on("SIGINT", () => {
  console.log("🛑 SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    mongoose.connection.close(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  });
});

// Memory monitoring
setInterval(() => {
  const memUsage = process.memoryUsage();
  const memUsageMB = {
    rss: Math.round(memUsage.rss / 1024 / 1024),
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
  };

  console.log(
    `📊 Memory Usage: RSS: ${memUsageMB.rss}MB, Heap Used: ${memUsageMB.heapUsed}MB, Heap Total: ${memUsageMB.heapTotal}MB`
  );

  // Restart if memory usage is too high
  if (memUsageMB.heapUsed > 500) {
    // 500MB limit
    console.log("⚠️ High memory usage detected, consider restarting server");
  }
}, 300000); // Check every 5 minutes

// Start the server
startServer();

// Global error handlers for crash protection
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

module.exports = app;
