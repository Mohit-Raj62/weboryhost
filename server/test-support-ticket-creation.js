const axios = require("axios");
const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");

const BASE_URL = "http://localhost:5002";
const MONGODB_URI =
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function testSupportTicketCreation() {
  console.log("🧪 Testing Support Ticket Creation...");

  try {
    // Test 1: Check server health
    console.log("\n1. Checking server health...");
    try {
      const healthResponse = await axios.get(`${BASE_URL}/api/health`);
      console.log("✅ Server is running");
    } catch (error) {
      console.log("❌ Server not running. Please start the server first.");
      return;
    }

    // Test 2: Check database connection
    console.log("\n2. Checking database connection...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected");

    // Test 3: Check existing tickets
    console.log("\n3. Checking existing tickets...");
    const existingTickets = await SupportTicket.countDocuments();
    console.log(`📋 Existing tickets in database: ${existingTickets}`);

    // Test 4: Create ticket via API
    console.log("\n4. Creating ticket via API...");
    const ticketData = {
      subject: "Test Ticket - API Creation",
      email: "test@example.com",
      message: "This is a test ticket to verify data storage is working.",
      priority: "high",
      ticketNumber: `TEST-${Date.now()}`,
      userName: "Test User",
      issueType: "Technical Issue",
    };

    try {
      const createResponse = await axios.post(
        `${BASE_URL}/api/support-tickets/create-public`,
        ticketData
      );
      console.log("✅ Ticket created via API!");
      console.log("📋 Response:", createResponse.data);

      // Test 5: Verify ticket was saved in database
      console.log("\n5. Verifying ticket was saved...");
      const savedTicket = await SupportTicket.findOne({
        ticketNumber: ticketData.ticketNumber,
      });
      if (savedTicket) {
        console.log("✅ Ticket found in database!");
        console.log("🆔 ID:", savedTicket._id);
        console.log("📝 Subject:", savedTicket.subject);
        console.log("📧 Email:", savedTicket.email);
        console.log("🔴 Status:", savedTicket.status);
        console.log("⚡ Priority:", savedTicket.priority);
        console.log("📅 Created:", savedTicket.createdAt);
      } else {
        console.log("❌ Ticket not found in database!");
      }
    } catch (error) {
      console.log(
        "❌ API creation failed:",
        error.response?.data || error.message
      );
    }

    // Test 6: Test duplicate prevention
    console.log("\n6. Testing duplicate prevention...");
    try {
      const duplicateResponse = await axios.post(
        `${BASE_URL}/api/support-tickets/create-public`,
        ticketData
      );
      console.log("❌ Duplicate ticket was created (should have failed)");
    } catch (error) {
      if (error.response?.status === 409) {
        console.log("✅ Duplicate prevention working correctly");
      } else {
        console.log("❌ Unexpected error:", error.response?.data);
      }
    }

    // Test 7: Create ticket directly in database
    console.log("\n7. Creating ticket directly in database...");
    const directTicket = new SupportTicket({
      subject: "Test Ticket - Direct Database",
      email: "direct@example.com",
      message: "This ticket was created directly in the database.",
      priority: "medium",
      status: "open",
      ticketNumber: `DIRECT-${Date.now()}`,
    });

    const savedDirectTicket = await directTicket.save();
    console.log("✅ Direct database creation successful!");
    console.log("🆔 ID:", savedDirectTicket._id);
    console.log("📝 Subject:", savedDirectTicket.subject);

    // Test 8: Final count
    console.log("\n8. Final ticket count...");
    const finalCount = await SupportTicket.countDocuments();
    console.log(`📊 Total tickets in database: ${finalCount}`);

    // Test 9: Show recent tickets
    console.log("\n9. Recent tickets in database:");
    const recentTickets = await SupportTicket.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("subject email status createdAt");

    recentTickets.forEach((ticket, index) => {
      console.log(
        `${index + 1}. ${ticket.subject} (${ticket.status}) - ${ticket.email}`
      );
    });

    console.log("\n🎉 Support ticket creation test completed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

// Run the test
testSupportTicketCreation();
