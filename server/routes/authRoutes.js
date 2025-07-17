const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
const emailService = require("../utils/emailService");
const { generateToken, verifyToken } = require("../utils/jwt");

// Admin Login
router.post(
  "/admin/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide both email and password" });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check if user is admin
      if (user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Access denied. Admin privileges required." });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      // Send response
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
);

// User Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide both email and password" });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      // Send response
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
);

// Register
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password, role = "user" } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields" });
      }

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      user = new User({
        name,
        email,
        password,
        role,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user
      await user.save();
      // Send confirmation email to user
      await emailService.sendConfirmationEmail({
        to: email,
        name,
        formType: "Registration",
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      // Send response
      res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
);

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get user profile (protected)
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Send verification email endpoint
router.post("/send-verification", async (req, res) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Generate a verification token (JWT, expires in 1 hour)
    const token = generateToken({ userId: user._id, email: user.email }, "1h");
    user.emailVerificationToken = token;
    await user.save();
    // Verification link with token
    const verificationLink = `https://yourdomain.com/verify-email?token=${token}`;
    await emailService.sendVerificationEmail({
      to: email,
      link: verificationLink,
      name,
    });
    res.status(200).json({ message: "Verification email sent!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send verification email." });
  }
});

// Verify email endpoint
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: "Verification token is required." });
  }
  try {
    const payload = verifyToken(token);
    const user = await User.findOne({
      _id: payload.userId,
      emailVerificationToken: token,
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification token." });
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    await user.save();
    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired verification token." });
  }
});

// Public GET endpoint for testing (browser se bhi test ho sake)
router.get('/test-public', (req, res) => {
  res.json({ message: 'Public test endpoint working!' });
});
// Test Brevo email endpoint (public)
router.post('/test-brevo', async (req, res) => {
  try {
    await emailService.sendConfirmationEmail({
      to: req.body.email,
      name: req.body.name || 'Test User',
      formType: 'Test Email'
    });
    res.json({ message: 'Test email sent (if Brevo is working)!' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to send test email.' });
  }
});

module.exports = router;
