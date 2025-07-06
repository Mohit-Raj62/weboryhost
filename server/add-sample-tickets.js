const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");
const Admin = require("./models/Admin");

const MONGODB_URI = "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function addSampleTickets() {
  console.log("📝 Adding sample support tickets to database...");
  
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ Connected to MongoDB");
    
    // Clear existing tickets (optional)
    const existingCount = await SupportTicket.countDocuments();
    console.log(`📋 Existing tickets: ${existingCount}`);
    
    // Sample tickets data
    const sampleTickets = [
      {
        subject: "Website not loading properly",
        email: "user1@example.com",
        message: "My website is taking too long to load and sometimes shows error pages. Please help me fix this issue.",
        priority: "high",
        status: "open"
      },
      {
        subject: "Payment gateway integration issue",
        email: "user2@example.com",
        message: "I need help integrating a payment gateway into my e-commerce website. Can you provide guidance?",
        priority: "medium",
        status: "in-progress"
      },
      {
        subject: "SEO optimization request",
        email: "user3@example.com",
        message: "I want to improve my website's search engine rankings. Looking for SEO optimization services.",
        priority: "medium",
        status: "resolved"
      },
      {
        subject: "Mobile responsiveness problem",
        email: "user4@example.com",
        message: "My website doesn't look good on mobile devices. Need help making it responsive.",
        priority: "high",
        status: "open"
      },
      {
        subject: "Domain and hosting setup",
        email: "user5@example.com",
        message: "I need help setting up domain and hosting for my new business website.",
        priority: "low",
        status: "closed"
      },
      {
        subject: "E-commerce functionality",
        email: "user6@example.com",
        message: "I want to add shopping cart and checkout functionality to my website.",
        priority: "high",
        status: "in-progress"
      },
      {
        subject: "Content management system",
        email: "user7@example.com",
        message: "Need a CMS to easily update website content without technical knowledge.",
        priority: "medium",
        status: "open"
      },
      {
        subject: "SSL certificate installation",
        email: "user8@example.com",
        message: "Help me install SSL certificate to make my website secure.",
        priority: "high",
        status: "resolved"
      }
    ];
    
    // Create admin account if doesn't exist
    const existingAdmin = await Admin.findOne({ email: "admin@webory.com" });
    if (!existingAdmin) {
      console.log("👤 Creating admin account...");
      const admin = new Admin({
        name: "Admin User",
        email: "admin@webory.com",
        password: "admin123",
        role: "admin"
      });
      await admin.save();
      console.log("✅ Admin account created");
    } else {
      console.log("✅ Admin account already exists");
    }
    
    // Add sample tickets
    console.log("\n📝 Adding sample tickets...");
    for (let i = 0; i < sampleTickets.length; i++) {
      const ticket = new SupportTicket(sampleTickets[i]);
      await ticket.save();
      console.log(`✅ Ticket ${i + 1} created: ${ticket.subject}`);
    }
    
    // Verify tickets were added
    const finalCount = await SupportTicket.countDocuments();
    console.log(`\n📊 Total tickets in database: ${finalCount}`);
    
    // Show ticket status summary
    const statusSummary = await SupportTicket.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    
    console.log("\n📈 Ticket Status Summary:");
    statusSummary.forEach(status => {
      console.log(`   ${status._id}: ${status.count} tickets`);
    });
    
    console.log("\n🎉 Sample tickets added successfully!");
    console.log("🔗 You can now view them in the admin dashboard");
    
  } catch (error) {
    console.error("❌ Error adding sample tickets:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

addSampleTickets();
