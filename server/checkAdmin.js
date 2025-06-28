const mongoose = require("mongoose");
const Admin = require("./models/Admin");

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function checkAdmin() {
  try {
    const admin = await Admin.findOne({ email: "admin@webory.com" });

    if (admin) {
      console.log("✅ Admin account found!");
      console.log("Email:", admin.email);
      console.log("Role:", admin.role);
      console.log("Is Active:", admin.isActive);
      console.log("Has Password:", !!admin.password);
      console.log("Password Length:", admin.password?.length);

      // Test password
      const isPasswordValid = await admin.comparePassword("admin123");
      console.log(
        "Password Test (admin123):",
        isPasswordValid ? "✅ Valid" : "❌ Invalid"
      );
    } else {
      console.log("❌ Admin account not found!");
      console.log("Creating admin account...");

      const newAdmin = new Admin({
        email: "admin@webory.com",
        password: "admin123",
        name: "Admin User",
        role: "admin",
      });

      await newAdmin.save();
      console.log("✅ Admin account created successfully!");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
}

checkAdmin();
