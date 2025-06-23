const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");

// Helper to generate JWT
const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      role: admin.role,
      permissions: admin.permissions,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Admin signup
const signup = async (req, res, next) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
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
    await admin.save();
    const token = generateToken(admin);
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
    next(error);
  }
};

// Admin login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }
    if (!admin.isActive) {
      return res.status(401).json({ error: "Account is deactivated" });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }
    admin.lastLogin = new Date();
    await admin.save();
    const token = generateToken(admin);
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
    next(error);
  }
};

module.exports = { signup, login };
