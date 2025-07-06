const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");
const Admin = require("./models/Admin");

const MONGODB_URI =
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function fixDataStorage() {
  console.log("🔧 Fixing Data Storage Issues...");

  try {
    // Step 1: Connect to database
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
    console.log("📊 Database:", mongoose.connection.name);

    // Step 2: Check current data
    console.log("\n2. Checking current data...");
    const ticketCount = await SupportTicket.countDocuments();
    const adminCount = await Admin.countDocuments();

    console.log(`📋 Current tickets: ${ticketCount}`);
    console.log(`👤 Current admins: ${adminCount}`);

    // Step 3: Create admin if doesn't exist
    console.log("\n3. Setting up admin account...");
    const existingAdmin = await Admin.findOne({ email: "admin@webory.com" });
    if (!existingAdmin) {
      const admin = new Admin({
        name: "Admin User",
        email: "admin@webory.com",
        password: "admin123",
        role: "admin",
      });
      await admin.save();
      console.log("✅ Admin account created");
    } else {
      console.log("✅ Admin account already exists");
    }

    // Step 4: Clear existing tickets (optional)
    console.log("\n4. Clearing existing tickets...");
    await SupportTicket.deleteMany({});
    console.log("✅ Cleared existing tickets");

    // Step 5: Create sample tickets
    console.log("\n5. Creating sample tickets...");
    const sampleTickets = [
      {
        subject: "Website Performance Issue",
        email: "client1@example.com",
        message: "My website is loading very slowly. Need urgent help.",
        priority: "high",
        status: "open",
      },
      {
        subject: "Payment Integration Help",
        email: "client2@example.com",
        message: "Need help integrating payment gateways.",
        priority: "medium",
        status: "in-progress",
      },
      {
        subject: "SEO Optimization Request",
        email: "client3@example.com",
        message: "Looking for SEO services to improve rankings.",
        priority: "medium",
        status: "resolved",
      },
      {
        subject: "Mobile Responsiveness",
        email: "client4@example.com",
        message: "Website doesn't look good on mobile devices.",
        priority: "high",
        status: "open",
      },
      {
        subject: "Domain Setup Help",
        email: "client5@example.com",
        message: "Need help setting up domain and hosting.",
        priority: "low",
        status: "closed",
      },
    ];

    for (const ticketData of sampleTickets) {
      const ticket = new SupportTicket(ticketData);
      await ticket.save();
      console.log(`✅ Created: ${ticket.subject}`);
    }

    // Step 6: Verify data was saved
    console.log("\n6. Verifying data storage...");
    const finalTicketCount = await SupportTicket.countDocuments();
    console.log(`📊 Final ticket count: ${finalTicketCount}`);

    if (finalTicketCount > 0) {
      console.log("✅ Data storage is working!");

      // Show sample tickets
      const tickets = await SupportTicket.find().limit(3);
      console.log("\n📋 Sample tickets:");
      tickets.forEach((ticket, index) => {
        console.log(`${index + 1}. ${ticket.subject} - ${ticket.status}`);
        console.log(`   Email: ${ticket.email}`);
        console.log(`   ID: ${ticket._id}`);
        console.log("");
      });
    } else {
      console.log("❌ Data storage issue detected!");
    }

    // Step 7: Test database operations
    console.log("\n7. Testing database operations...");

    // Test read operation
    const testTicket = await SupportTicket.findOne();
    if (testTicket) {
      console.log("✅ Database read working");
    } else {
      console.log("❌ Database read failed");
    }

    // Test update operation
    if (testTicket) {
      testTicket.status = "in-progress";
      await testTicket.save();
      console.log("✅ Database update working");
    }

    // Test delete operation
    const deleteResult = await SupportTicket.deleteOne({ _id: testTicket._id });
    if (deleteResult.deletedCount > 0) {
      console.log("✅ Database delete working");
    } else {
      console.log("❌ Database delete failed");
    }

    console.log("\n🎉 Data storage fix completed!");
    console.log("\n📋 Next steps:");
    console.log("1. Start server: node server.js");
    console.log("2. Test API: node test-ticket-creation.js");
    console.log("3. Check dashboard: http://localhost:5173/admin/login");
  } catch (error) {
    console.error("❌ Fix failed:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
}

fixDataStorage();
