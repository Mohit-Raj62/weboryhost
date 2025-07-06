const axios = require("axios");

const API_BASE_URL = "http://localhost:5002";

async function testSupportTicketAPI() {
  console.log("🧪 Testing Support Ticket API...");

  try {
    // Test 1: Health check
    console.log("\n1. Testing health endpoint...");
    const healthResponse = await axios.get(`${API_BASE_URL}/api/health`);
    console.log("✅ Health check passed:", healthResponse.data);

    // Test 2: Check if support ticket routes exist
    console.log("\n2. Testing support ticket routes...");
    try {
      const ticketsResponse = await axios.get(
        `${API_BASE_URL}/api/support-tickets/admin/all`
      );
      console.log(
        "✅ Support tickets endpoint accessible:",
        ticketsResponse.data
      );
    } catch (error) {
      console.log("❌ Support tickets endpoint error:", {
        status: error.response?.status,
        message: error.response?.data?.error || error.message,
      });
    }

    // Test 3: Check stats endpoint
    console.log("\n3. Testing stats endpoint...");
    try {
      const statsResponse = await axios.get(
        `${API_BASE_URL}/api/support-tickets/admin/stats`
      );
      console.log("✅ Stats endpoint accessible:", statsResponse.data);
    } catch (error) {
      console.log("❌ Stats endpoint error:", {
        status: error.response?.status,
        message: error.response?.data?.error || error.message,
      });
    }

    console.log("\n🎉 API testing completed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.error(
        "💡 Server is not running. Please start the server with: npm start"
      );
    }
  }
}

testSupportTicketAPI();
