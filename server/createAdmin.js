const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Admin Schema
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@webory.com" });

    if (existingAdmin) {
      console.log("✅ Admin account already exists!");
      console.log("Email: admin@webory.com");
      console.log("Password: admin123");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Create admin
    const admin = new Admin({
      email: "admin@webory.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
    });

    await admin.save();

    console.log("✅ Admin account created successfully!");
    console.log("Email: admin@webory.com");
    console.log("Password: admin123");
    console.log("\nNow you can login at: http://localhost:5173/admin/login");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
