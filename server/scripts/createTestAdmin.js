const mongoose = require("mongoose");
const Admin = require("../models/Admin");
require("dotenv").config();

const createTestAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory"
    );
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@webory.com" });
    if (existingAdmin) {
      console.log("Test admin already exists:", existingAdmin.email);
      return;
    }

    // Create test admin
    const admin = new Admin({
      name: "Test Admin",
      email: "admin@webory.com",
      password: "admin123",
      role: "admin",
      isActive: true,
    });

    await admin.save();
    console.log("Test admin created successfully:", {
      email: admin.email,
      role: admin.role,
      id: admin._id,
    });

    console.log("\nTest Admin Credentials:");
    console.log("Email: admin@webory.com");
    console.log("Password: admin123");
    console.log(
      "\nYou can now use these credentials to login to the admin dashboard."
    );
  } catch (error) {
    console.error("Error creating test admin:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

createTestAdmin();
