const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");

// Connect to database
mongoose.connect("mongodb://localhost:27017/webory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testDatabase() {
  try {
    console.log("Testing database connection...");

    // Test creating a ticket
    const testTicket = new SupportTicket({
      subject: "Test Ticket",
      email: "test@example.com",
      message: "This is a test ticket",
      ticketNumber: "SUP-20241201-9999",
      userName: "Test User",
      issueType: "Test Issue",
    });

    await testTicket.save();
    console.log("✅ Ticket saved to database:", testTicket._id);

    // Test retrieving tickets
    const tickets = await SupportTicket.find();
    console.log("✅ Found", tickets.length, "tickets in database");

    // Clean up test ticket
    await SupportTicket.findByIdAndDelete(testTicket._id);
    console.log("✅ Test ticket cleaned up");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
}

testDatabase();
