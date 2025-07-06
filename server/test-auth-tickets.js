const axios = require("axios");

const BASE_URL = "http://localhost:5002";

async function testAuthAndTickets() {
  console.log("🔐 Testing Authentication and Ticket Access...");

  try {
    // Test 1: Server health
    console.log("\n1. Testing server health...");
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log("✅ Server is running");

    // Test 2: Try to get tickets without auth (should fail)
    console.log("\n2. Testing tickets without authentication...");
    try {
      const noAuthResponse = await axios.get(
        `${BASE_URL}/api/support-tickets/admin/all`
      );
      console.log("❌ Should have failed but succeeded:", noAuthResponse.data);
    } catch (error) {
      console.log(
        "✅ Correctly rejected without auth:",
        error.response?.status
      );
    }

    // Test 3: Admin login
    console.log("\n3. Logging in as admin...");
    const loginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
      email: "admin@webory.com",
      password: "admin123",
    });

    console.log("✅ Admin login successful!");
    const adminToken = loginResponse.data.token;
    console.log("🎫 Token received:", adminToken ? "Yes" : "No");

    // Test 4: Get tickets with auth
    console.log("\n4. Testing tickets with authentication...");
    const ticketsResponse = await axios.get(
      `${BASE_URL}/api/support-tickets/admin/all`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );

    console.log("✅ Tickets fetched with auth!");
    console.log("📋 Response structure:", {
      total: ticketsResponse.data.total,
      page: ticketsResponse.data.page,
      totalPages: ticketsResponse.data.totalPages,
      ticketsCount: ticketsResponse.data.tickets?.length || 0,
    });

    // Test 5: Show ticket details
    if (
      ticketsResponse.data.tickets &&
      ticketsResponse.data.tickets.length > 0
    ) {
      console.log("\n5. Sample ticket details:");
      const ticket = ticketsResponse.data.tickets[0];
      console.log("📝 Subject:", ticket.subject);
      console.log("📧 Email:", ticket.email);
      console.log("🔴 Status:", ticket.status);
      console.log("⚡ Priority:", ticket.priority);
      console.log("🆔 ID:", ticket._id);
    } else {
      console.log("\n❌ No tickets found in response!");
      console.log("📋 Full response:", ticketsResponse.data);
    }

    // Test 6: Get statistics
    console.log("\n6. Testing statistics...");
    const statsResponse = await axios.get(
      `${BASE_URL}/api/support-tickets/admin/stats`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );

    console.log("✅ Statistics fetched!");
    console.log("📊 Stats:", {
      totalTickets: statsResponse.data.totalTickets,
      openTickets: statsResponse.data.openTickets,
      inProgressTickets: statsResponse.data.inProgressTickets,
      resolvedTickets: statsResponse.data.resolvedTickets,
      closedTickets: statsResponse.data.closedTickets,
    });

    console.log("\n🎉 Authentication and ticket access test completed!");

    if (
      ticketsResponse.data.tickets &&
      ticketsResponse.data.tickets.length > 0
    ) {
      console.log("✅ Tickets are accessible with proper authentication");
      console.log("✅ Dashboard should work correctly");
    } else {
      console.log("❌ No tickets found - check database setup");
      console.log("💡 Run: node debug-tickets.js");
    }
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);

    if (error.code === "ECONNREFUSED") {
      console.log("\n💡 Server is not running. Start with:");
      console.log("   node server.js");
    }
  }
}

testAuthAndTickets();
