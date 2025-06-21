require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const createTestAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminData = {
      name: "Test Admin",
      email: "admin@webory.com",
      password: "admin123",
      role: "super_admin",
    };

    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Test admin already exists");
      process.exit(0);
    }

    const admin = new Admin(adminData);
    await admin.save();

    console.log("Test admin created successfully");
    console.log("Email:", adminData.email);
    console.log("Password:", adminData.password);

    process.exit(0);
  } catch (error) {
    console.error("Error creating test admin:", error);
    process.exit(1);
  }
};

createTestAdmin();
