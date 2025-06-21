require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const admin = await Admin.findOne({ email: "admin@webory.com" });

    if (admin) {
      console.log("Admin user found:");
      console.log("Email:", admin.email);
      console.log("Name:", admin.name);
      console.log("Role:", admin.role);
      console.log("Is Active:", admin.isActive);
      console.log("Last Login:", admin.lastLogin);
    } else {
      console.log("No admin user found with email: admin@webory.com");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error checking admin:", error);
    process.exit(1);
  }
};

checkAdmin();
