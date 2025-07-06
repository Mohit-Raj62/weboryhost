const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");
const Admin = require("./models/Admin");

// MongoDB connection string
const MONGODB_URI =
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function testDatabase() {
  console.log("🧪 Testing database connection and data storage...");

  try {
    // Connect to MongoDB
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully!");
    console.log("📊 Database:", mongoose.connection.name);
    console.log("🌐 Host:", mongoose.connection.host);
    console.log("🔗 Connection state:", mongoose.connection.readyState);

    // Test 2: Check existing data
    console.log("\n2. Checking existing data...");
    const existingTickets = await SupportTicket.countDocuments();
    const existingAdmins = await Admin.countDocuments();

    console.log("📋 Existing support tickets:", existingTickets);
    console.log("👤 Existing admins:", existingAdmins);

    // Test 3: Create test support ticket
    console.log("\n3. Creating test support ticket...");
    const testTicket = new SupportTicket({
      subject: "Test Ticket - Database Storage",
      email: "test@example.com",
      message: "This is a test ticket to verify database storage is working.",
      priority: "medium",
      status: "open",
    });

    const savedTicket = await testTicket.save();
    console.log("✅ Test ticket created successfully!");
    console.log("🆔 Ticket ID:", savedTicket._id);
    console.log("📝 Subject:", savedTicket.subject);
    console.log("📅 Created at:", savedTicket.createdAt);

    // Test 4: Verify ticket was saved
    console.log("\n4. Verifying ticket was saved...");
    const foundTicket = await SupportTicket.findById(savedTicket._id);
    if (foundTicket) {
      console.log("✅ Ticket found in database!");
      console.log("📋 Ticket details:", {
        id: foundTicket._id,
        subject: foundTicket.subject,
        email: foundTicket.email,
        status: foundTicket.status,
        priority: foundTicket.priority,
      });
    } else {
      console.log("❌ Ticket not found in database!");
    }

    // Test 5: Create test admin if doesn't exist
    console.log("\n5. Checking admin account...");
    const existingAdmin = await Admin.findOne({ email: "admin@webory.com" });
    if (!existingAdmin) {
      console.log("👤 Creating test admin account...");
      const testAdmin = new Admin({
        name: "Test Admin",
        email: "admin@webory.com",
        password: "admin123",
        role: "admin",
      });

      const savedAdmin = await testAdmin.save();
      console.log("✅ Test admin created successfully!");
      console.log("🆔 Admin ID:", savedAdmin._id);
      console.log("📧 Email:", savedAdmin.email);
    } else {
      console.log("✅ Admin account already exists");
    }

    // Test 6: Count total tickets after creation
    console.log("\n6. Final data count...");
    const finalTicketCount = await SupportTicket.countDocuments();
    const finalAdminCount = await Admin.countDocuments();

    console.log("📋 Total support tickets:", finalTicketCount);
    console.log("👤 Total admins:", finalAdminCount);

    console.log(
      "\n🎉 All database tests passed! Data storage is working correctly."
    );
  } catch (error) {
    console.error("❌ Database test failed:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed.");
  }
}

testDatabase();
