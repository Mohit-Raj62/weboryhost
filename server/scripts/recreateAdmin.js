require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const recreateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Delete existing admin
    await Admin.deleteOne({ email: "admin@webory.com" });
    console.log("Deleted existing admin user");

    // Create new admin
    const admin = new Admin({
      name: "Admin User",
      email: "admin@webory.com",
      password: "admin123",
      role: "admin",
      isActive: true,
    });

    await admin.save();
    console.log("Created new admin user:");
    console.log("Email:", admin.email);
    console.log("Password: admin123");
    console.log("Role:", admin.role);
    console.log("Is Active:", admin.isActive);

    process.exit(0);
  } catch (error) {
    console.error("Error recreating admin:", error);
    process.exit(1);
  }
};

recreateAdmin();
