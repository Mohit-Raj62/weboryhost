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
    console.log("Admin signup request:", {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    });

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Admin with this email already exists" });
    }

    // Validate role
    const validRoles = ["admin", "moderator", "editor"];
    if (!validRoles.includes(req.body.role)) {
      return res.status(400).json({ error: "Invalid role specified" });
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

    console.log("Admin created successfully:", {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    });

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
    next(error);
  }
};

// Admin login
const login = async (req, res, next) => {
  try {
    console.log("Admin login request received:", {
      email: req.body.email,
      hasPassword: !!req.body.password,
      body: req.body,
    });

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    console.log("Admin found:", admin ? "Yes" : "No");

    if (!admin) {
      console.log("Admin not found for email:", email);
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    if (!admin.isActive) {
      console.log("Admin account is deactivated");
      return res.status(401).json({ error: "Account is deactivated" });
    }

    const isMatch = await admin.comparePassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    admin.lastLogin = new Date();
    await admin.save();
    const token = generateToken(admin);

    console.log("Admin login successful:", {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    });

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
    console.error("Admin login error:", error);
    next(error);
  }
};

module.exports = { signup, login };
