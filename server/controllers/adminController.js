const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcryptjs");

// Admin signup
const signup = async (req, res) => {
  try {
    console.log("Admin signup attempt:", req.body.email);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      console.log("Admin already exists:", req.body.email);
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    // Validate role
    const validRoles = ["admin", "moderator", "editor"];
    if (!validRoles.includes(req.body.role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Create new admin
    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      isActive: true,
    });

    // Save admin
    await admin.save();
    console.log("New admin created:", admin.email);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        permissions: admin.permissions,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Admin account created successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
      },
    });
  } catch (error) {
    console.error("Admin signup error:", error);
    res.status(500).json({ message: "Error creating admin account" });
  }
};

// Admin login
const login = async (req, res) => {
  try {
    console.log("Login attempt:", { email: req.body.email });
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    console.log("Admin found:", admin ? "Yes" : "No");

    if (!admin) {
      console.log("No admin found with email:", email);
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    // Check if admin is active
    if (!admin.isActive) {
      console.log("Admin account is deactivated:", email);
      return res.status(401).json({ error: "Account is deactivated" });
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    console.log("Password match:", isMatch ? "Yes" : "No");

    if (!isMatch) {
      console.log("Invalid password for admin:", email);
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = jwt.sign(
      { _id: admin._id.toString() },
      process.env.JWT_SECRET
    );

    console.log("Login successful for admin:", email);
    res.json({
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalPosts, totalComments, activeUsers] =
      await Promise.all([
        User.countDocuments(),
        Post.countDocuments(),
        Comment.countDocuments(),
        User.countDocuments({
          lastActive: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        }),
      ]);

    res.json({
      totalUsers,
      totalPosts,
      totalComments,
      activeUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent activity
const getRecentActivity = async (req, res) => {
  try {
    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name");

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email createdAt");

    const recentComments = await Comment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name")
      .populate("post", "title");

    res.json({
      recentPosts,
      recentUsers,
      recentComments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  getDashboardStats,
  getRecentActivity,
};
