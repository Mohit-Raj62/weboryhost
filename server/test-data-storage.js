const axios = require("axios");

const BASE_URL = "http://localhost:5002";

async function testDataStorage() {
  console.log("🧪 Testing data storage functionality...");

  try {
    // Test 1: Health check
    console.log("\n1. Testing server health...");
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log("✅ Server is running:", healthResponse.data);

    // Test 2: Create support ticket without authentication
    console.log("\n2. Creating support ticket (public route)...");
    const ticketData = {
      subject: "Test Ticket - Data Storage Test",
      email: "test@example.com",
      message:
        "This is a test ticket to verify data storage is working properly.",
      priority: "high",
    };

    const createResponse = await axios.post(
      `${BASE_URL}/api/support-tickets/create-public`,
      ticketData
    );
    console.log("✅ Ticket created successfully!");
    console.log("📋 Response:", createResponse.data);

    // Test 3: Create admin account
    console.log("\n3. Creating admin account...");
    const adminData = {
      name: "Test Admin",
      email: "admin@webory.com",
      password: "admin123",
      role: "admin",
    };

    try {
      const adminResponse = await axios.post(
        `${BASE_URL}/api/admin/signup`,
        adminData
      );
      console.log("✅ Admin created successfully!");
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message?.includes("already exists")
      ) {
        console.log("ℹ️ Admin account already exists");
      } else {
        console.log("❌ Admin creation failed:", error.response?.data);
      }
    }

    // Test 4: Login as admin
    console.log("\n4. Logging in as admin...");
    const loginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
      email: "admin@webory.com",
      password: "admin123",
    });

    console.log("✅ Admin login successful!");
    const adminToken = loginResponse.data.token;

    // Test 5: Get all tickets (admin view)
    console.log("\n5. Fetching all tickets (admin view)...");
    const ticketsResponse = await axios.get(
      `${BASE_URL}/api/support-tickets/admin/all`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );

    console.log("✅ Tickets fetched successfully!");
    console.log("📋 Total tickets:", ticketsResponse.data.total);
    console.log(
      "📄 Tickets in response:",
      ticketsResponse.data.tickets?.length || 0
    );

    // Test 6: Get ticket statistics
    console.log("\n6. Fetching ticket statistics...");
    const statsResponse = await axios.get(
      `${BASE_URL}/api/support-tickets/admin/stats`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );

    console.log("✅ Statistics fetched successfully!");
    console.log("📊 Stats:", statsResponse.data);

    console.log("\n🎉 All data storage tests passed!");
    console.log("✅ Tickets are being stored in the database");
    console.log("✅ Admin authentication is working");
    console.log("✅ Data retrieval is working");
  } catch (error) {
    console.error(
      "❌ Data storage test failed:",
      error.response?.data || error.message
    );

    if (error.code === "ECONNREFUSED") {
      console.log("\n💡 The server is not running. Please start it with:");
      console.log("   node server.js");
    }
  }
}

testDataStorage();
 