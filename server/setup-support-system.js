const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");
const Admin = require("./models/Admin");

const MONGODB_URI =
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function setupSupportSystem() {
  console.log("🚀 Setting up Support Ticket System...");

  try {
    // Connect to MongoDB
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully!");

    // Create admin account
    console.log("\n2. Setting up admin account...");
    const existingAdmin = await Admin.findOne({ email: "admin@webory.com" });
    if (!existingAdmin) {
      const admin = new Admin({
        name: "Admin User",
        email: "admin@webory.com",
        password: "admin123",
        role: "admin",
      });
      await admin.save();
      console.log("✅ Admin account created successfully!");
      console.log("📧 Email: admin@webory.com");
      console.log("🔑 Password: admin123");
    } else {
      console.log("✅ Admin account already exists");
    }

    // Add sample tickets
    console.log("\n3. Adding sample support tickets...");
    const sampleTickets = [
      {
        subject: "Website Performance Issue",
        email: "client1@example.com",
        message:
          "My website is loading very slowly. Need urgent help to optimize performance.",
        priority: "high",
        status: "open",
      },
      {
        subject: "Payment Integration Help",
        email: "client2@example.com",
        message:
          "I need help integrating PayPal and Stripe payment gateways to my e-commerce site.",
        priority: "medium",
        status: "in-progress",
      },
      {
        subject: "SEO Optimization Request",
        email: "client3@example.com",
        message:
          "Looking for SEO services to improve my website rankings on Google.",
        priority: "medium",
        status: "resolved",
      },
      {
        subject: "Mobile Responsiveness",
        email: "client4@example.com",
        message:
          "My website doesn't look good on mobile devices. Need responsive design.",
        priority: "high",
        status: "open",
      },
      {
        subject: "Domain and Hosting Setup",
        email: "client5@example.com",
        message:
          "Need help setting up domain and hosting for my new business website.",
        priority: "low",
        status: "closed",
      },
      {
        subject: "E-commerce Development",
        email: "client6@example.com",
        message:
          "Want to build a complete e-commerce website with shopping cart and checkout.",
        priority: "high",
        status: "in-progress",
      },
      {
        subject: "Content Management System",
        email: "client7@example.com",
        message:
          "Need a CMS to easily update website content without technical knowledge.",
        priority: "medium",
        status: "open",
      },
      {
        subject: "SSL Certificate Installation",
        email: "client8@example.com",
        message:
          "Help me install SSL certificate to make my website secure and trusted.",
        priority: "high",
        status: "resolved",
      },
      {
        subject: "Database Optimization",
        email: "client9@example.com",
        message:
          "My website database is getting slow. Need optimization and backup solutions.",
        priority: "medium",
        status: "open",
      },
      {
        subject: "Social Media Integration",
        email: "client10@example.com",
        message:
          "Want to integrate social media feeds and sharing buttons to my website.",
        priority: "low",
        status: "resolved",
      },
    ];

    let addedCount = 0;
    for (const ticketData of sampleTickets) {
      const ticket = new SupportTicket(ticketData);
      await ticket.save();
      addedCount++;
      console.log(`✅ Ticket ${addedCount}: ${ticket.subject}`);
    }

    // Show final statistics
    console.log("\n4. Final Statistics:");
    const totalTickets = await SupportTicket.countDocuments();
    const openTickets = await SupportTicket.countDocuments({ status: "open" });
    const inProgressTickets = await SupportTicket.countDocuments({
      status: "in-progress",
    });
    const resolvedTickets = await SupportTicket.countDocuments({
      status: "resolved",
    });
    const closedTickets = await SupportTicket.countDocuments({
      status: "closed",
    });

    console.log(`📊 Total Tickets: ${totalTickets}`);
    console.log(`🔴 Open: ${openTickets}`);
    console.log(`🟡 In Progress: ${inProgressTickets}`);
    console.log(`🟢 Resolved: ${resolvedTickets}`);
    console.log(`⚫ Closed: ${closedTickets}`);

    console.log("\n🎉 Support Ticket System Setup Complete!");
    console.log("\n📋 Next Steps:");
    console.log("1. Start the server: node server.js");
    console.log("2. Go to admin login: http://localhost:5173/admin/login");
    console.log("3. Login with: admin@webory.com / admin123");
    console.log("4. View support tickets in the admin dashboard");
  } catch (error) {
    console.error("❌ Setup failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
}

setupSupportSystem();
