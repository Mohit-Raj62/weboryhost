const mongoose = require("mongoose");
const Admin = require("../models/Admin"); // Assuming Admin model exists, need to check filename
require("dotenv").config({ path: "../.env" });

const createAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      // Fallback to local mongo if .env missing
      console.log("No MONGODB_URI found, using default local URI");
    }
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/webory";

    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const adminEmail = "admin@local.com";
    const adminPassword = "password123";

    // Check if admin exists
    // Note: Use the model name found in previous steps or list_dir if unsure.
    // I saw admin.js in routes, but need to check models directory again or assume Admin.js exists
    // Let's check models dir first to be sure.

    // START_TEMPORARY_CHECK
    // I will check the models directory content from previous steps.
    // Step 29 output showed: Admin.js (2339 bytes)

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists");
      existingAdmin.password = adminPassword; // Update password just in case
      await existingAdmin.save();
      console.log("Admin password updated");
    } else {
      const newAdmin = new Admin({
        name: "Local Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin user created successfully");
    }

    console.log("Credentials:");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
