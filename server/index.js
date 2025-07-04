require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

// Import routes with error handling
let authRoutes,
  adminRoutes,
  postRoutes,
  commentRoutes,
  contactRoutes,
  errorHandler,
  projectRoutes,
  invoiceRoutes;

try {
  authRoutes = require("./routes/authRoutes");
  adminRoutes = require("./routes/admin");
  postRoutes = require("./routes/postRoutes");
  commentRoutes = require("./routes/commentRoutes");
  contactRoutes = require("./routes/contactRoutes");
  errorHandler = require("./middleware/errorHandler");
  projectRoutes = require("./routes/projectRoutes");
  invoiceRoutes = require("./routes/invoiceRoutes");
} catch (error) {
  console.error("Error loading routes:", error.message);
  process.exit(1);
}
const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://webory.netlify.app",
  "https://*.netlify.app",
  // Add your production frontend URL here
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.endsWith(".netlify.app")
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
        req.headers.origin?.endsWith(".netlify.app"),
    },
  });
});

// Debug: Add a test route to verify routing is working
app.get("/api/test", (req, res) => {
  res.json({
    message: "Test route working",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/invoices", invoiceRoutes);

// Serve static files (only in production) - but only for non-API routes
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res, next) => {
    // Skip API routes for static file serving
    if (req.path.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// Debug: Log all registered routes
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(
      `${Object.keys(middleware.route.methods)} ${middleware.route.path}`
    );
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(
          `${Object.keys(handler.route.methods)} ${handler.route.path}`
        );
      }
    });
  }
});

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

// For deployment, set all secrets and config in environment variables (.env or platform dashboard)

// Plugin loader
const pluginsDir = path.join(__dirname, "plugins");
if (fs.existsSync(pluginsDir)) {
  fs.readdirSync(pluginsDir).forEach((file) => {
    if (file.endsWith(".js")) {
      const plugin = require(path.join(pluginsDir, file));
      if (typeof plugin === "function") {
        plugin(app);
        console.log(`Loaded plugin: ${file}`);
      }
    }
  });
}
