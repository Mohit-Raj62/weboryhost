const axios = require("axios");

async function testAdminDashboard() {
  try {
    console.log("=== TESTING ADMIN DASHBOARD API ===");

    // Test the admin stats endpoint
    const response = await axios.get("http://localhost:5002/api/admin/stats");

    console.log("✅ Admin dashboard API is working!");
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  } catch (error) {
    console.error("❌ Error testing admin dashboard:", error.message);
    console.error("Error details:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
  }
}

testAdminDashboard();
