const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuth = async (req, res, next) => {
  try {
    console.log("🔐 AdminAuth middleware called for:", req.method, req.path);
    console.log("📋 All headers:", req.headers);
    console.log("🔑 Authorization header:", req.header("Authorization"));

    const authHeader = req.header("Authorization");
    console.log("🔑 Auth header:", authHeader);

    if (!authHeader) {
      console.log("❌ No Authorization header found");
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("🎫 Token extracted:", token ? "Yes" : "No");
    console.log("📏 Token length:", token?.length);
    console.log(
      "🎫 Token preview:",
      token ? token.substring(0, 20) + "..." : "None"
    );

    if (!token) {
      console.log("❌ No token found in Authorization header");
      return res.status(401).json({ error: "Token missing" });
    }

    console.log("🔍 Verifying JWT token...");
    console.log("🔑 JWT_SECRET present:", !!process.env.JWT_SECRET);
    console.log("🔑 JWT_SECRET length:", process.env.JWT_SECRET?.length);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ JWT verified successfully");
    console.log("📋 Decoded token:", {
      id: decoded.id,
      role: decoded.role,
      permissions: decoded.permissions,
    });

    console.log("🔍 Finding admin in database...");
    console.log("🔍 Looking for admin with ID:", decoded.id);
    const admin = await Admin.findOne({ _id: decoded.id, isActive: true });
    console.log("👤 Admin found:", admin ? "Yes" : "No");

    if (!admin) {
      console.log("❌ Admin not found or inactive");
      console.log("🔍 Searched for ID:", decoded.id);
      return res.status(401).json({ error: "Admin not found or inactive" });
    }

    console.log("✅ Admin authenticated successfully:", {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    });

    req.token = token;
    req.admin = admin;
    next();
  } catch (error) {
    console.error("❌ AdminAuth error:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token format" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }

    res.status(401).json({ error: "Please authenticate as admin." });
  }
};

module.exports = adminAuth;
