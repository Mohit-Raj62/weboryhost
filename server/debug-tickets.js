const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");
const Admin = require("./models/Admin");

const MONGODB_URI =
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function debugTickets() {
  console.log("🔍 Debugging Support Tickets...");

  try {
    // Connect to MongoDB
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
    console.log("📊 Database:", mongoose.connection.name);

    // Check if tickets exist
    console.log("\n2. Checking existing tickets...");
    const ticketCount = await SupportTicket.countDocuments();
    console.log(`📋 Total tickets in database: ${ticketCount}`);

    if (ticketCount === 0) {
      console.log("❌ No tickets found in database!");
      console.log("📝 Creating sample tickets...");

      // Create sample tickets
      const sampleTickets = [
        {
          subject: "Test Ticket 1",
          email: "test1@example.com",
          message: "This is a test ticket to debug the issue.",
          priority: "high",
          status: "open",
        },
        {
          subject: "Test Ticket 2",
          email: "test2@example.com",
          message: "Another test ticket for debugging.",
          priority: "medium",
          status: "in-progress",
        },
      ];

      for (const ticketData of sampleTickets) {
        const ticket = new SupportTicket(ticketData);
        await ticket.save();
        console.log(`✅ Created ticket: ${ticket.subject} (ID: ${ticket._id})`);
      }

      console.log("✅ Sample tickets created!");
    } else {
      console.log("✅ Tickets found in database");

      // Show existing tickets
      const tickets = await SupportTicket.find().limit(5);
      console.log("\n📋 Sample tickets:");
      tickets.forEach((ticket, index) => {
        console.log(
          `${index + 1}. ${ticket.subject} - ${ticket.status} (${
            ticket.priority
          })`
        );
        console.log(`   Email: ${ticket.email}`);
        console.log(`   ID: ${ticket._id}`);
        console.log(`   Created: ${ticket.createdAt}`);
        console.log("");
      });
    }

    // Check admin account
    console.log("\n3. Checking admin account...");
    const adminCount = await Admin.countDocuments();
    console.log(`👤 Total admins: ${adminCount}`);

    const admin = await Admin.findOne({ email: "admin@webory.com" });
    if (admin) {
      console.log("✅ Admin account exists");
      console.log(`📧 Email: ${admin.email}`);
      console.log(`🆔 ID: ${admin._id}`);
    } else {
      console.log("❌ Admin account not found!");
      console.log("👤 Creating admin account...");

      const newAdmin = new Admin({
        name: "Admin User",
        email: "admin@webory.com",
        password: "admin123",
        role: "admin",
      });

      await newAdmin.save();
      console.log("✅ Admin account created!");
    }

    // Final count
    const finalTicketCount = await SupportTicket.countDocuments();
    console.log(`\n📊 Final ticket count: ${finalTicketCount}`);

    console.log("\n🎉 Debug complete!");
    console.log("📋 Next steps:");
    console.log("1. Start server: node server.js");
    console.log("2. Test API: node test-dashboard.js");
    console.log("3. Check frontend dashboard");
  } catch (error) {
    console.error("❌ Debug failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
}

debugTickets();
