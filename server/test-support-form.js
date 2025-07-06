const axios = require("axios");

// Test data for support ticket
const testTicketData = {
  subject: "Test Issue - Technical Problem",
  email: "test@example.com",
  message:
    "This is a test support ticket to verify the form is working with the database.",
  priority: "medium",
  ticketNumber: "SUP-20241201-1234",
  userName: "Test User",
  issueType: "Technical Issue",
};

async function testSupportTicketCreation() {
  try {
    console.log("Testing support ticket creation...");
    console.log("Test data:", testTicketData);

    const response = await axios.post(
      "http://localhost:5002/api/support-tickets/create-public",
      testTicketData
    );

    console.log("✅ Success! Ticket created:");
    console.log("Response:", response.data);

    // Test fetching tickets
    console.log("\nTesting ticket retrieval...");
    const ticketsResponse = await axios.get(
      "http://localhost:5002/api/support-tickets"
    );
    console.log(
      "✅ Tickets retrieved:",
      ticketsResponse.data.tickets.length,
      "tickets"
    );
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

testSupportTicketCreation();
