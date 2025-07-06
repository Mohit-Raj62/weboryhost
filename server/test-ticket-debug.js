const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");

// Connect to database
mongoose.connect("mongodb://localhost:27017/webory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testTicketCreation() {
  try {
    console.log("=== TESTING TICKET CREATION ===");

    // Test data that matches what frontend sends
    const testTicketData = {
      subject: "Technical Issue - Test User",
      email: "test@example.com",
      message: "This is a test message",
      priority: "medium",
      ticketNumber: "SUP-20241201-9999",
      userName: "Test User",
      issueType: "Technical Issue",
    };

    console.log("Creating ticket with data:", testTicketData);

    const ticket = new SupportTicket(testTicketData);
    await ticket.save();

    console.log("✅ Ticket saved successfully!");
    console.log("Ticket ID:", ticket._id);
    console.log("Ticket data:", {
      subject: ticket.subject,
      email: ticket.email,
      message: ticket.message,
      priority: ticket.priority,
      ticketNumber: ticket.ticketNumber,
      userName: ticket.userName,
      issueType: ticket.issueType,
      status: ticket.status,
    });

    // Test retrieving the ticket
    const retrievedTicket = await SupportTicket.findById(ticket._id);
    console.log("\n✅ Retrieved ticket:");
    console.log("All fields:", retrievedTicket.toObject());

    // Clean up
    await SupportTicket.findByIdAndDelete(ticket._id);
    console.log("\n✅ Test ticket cleaned up");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Full error:", error);
  } finally {
    mongoose.connection.close();
  }
}

testTicketCreation();
