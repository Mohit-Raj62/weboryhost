const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");

// Connect to database
mongoose.connect("mongodb://localhost:27017/webory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function checkExistingTickets() {
  try {
    console.log("=== CHECKING EXISTING TICKETS ===");

    const tickets = await SupportTicket.find().sort({ createdAt: -1 });

    console.log(`Found ${tickets.length} tickets in database:`);

    tickets.forEach((ticket, index) => {
      console.log(`\n--- Ticket ${index + 1} ---`);
      console.log("ID:", ticket._id);
      console.log("Subject:", ticket.subject);
      console.log("Email:", ticket.email);
      console.log("Message:", ticket.message);
      console.log("Priority:", ticket.priority);
      console.log("Status:", ticket.status);
      console.log("Ticket Number:", ticket.ticketNumber || "N/A");
      console.log("User Name:", ticket.userName || "N/A");
      console.log("Issue Type:", ticket.issueType || "N/A");
      console.log("Created:", ticket.createdAt);
      console.log("User ID:", ticket.user || "N/A");
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
}

checkExistingTickets();
