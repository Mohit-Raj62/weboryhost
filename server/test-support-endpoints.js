const axios = require("axios");

const BASE_URL = "http://localhost:5002";

async function testEndpoints() {
  console.log("Testing support ticket endpoints...");

  try {
    // Test health endpoint
    console.log("\n1. Testing health endpoint...");
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log("✅ Health endpoint working:", healthResponse.data);

    // Test support tickets stats endpoint (without auth for now)
    console.log("\n2. Testing support tickets stats endpoint...");
    try {
      const statsResponse = await axios.get(
        `${BASE_URL}/api/support-tickets/admin/stats`
      );
      console.log("✅ Stats endpoint working:", statsResponse.data);
    } catch (error) {
      console.log(
        "❌ Stats endpoint error:",
        error.response?.status,
        error.response?.data
      );
    }

    // Test support tickets list endpoint
    console.log("\n3. Testing support tickets list endpoint...");
    try {
      const listResponse = await axios.get(
        `${BASE_URL}/api/support-tickets/admin/all`
      );
      console.log("✅ List endpoint working:", listResponse.data);
    } catch (error) {
      console.log(
        "❌ List endpoint error:",
        error.response?.status,
        error.response?.data
      );
    }
  } catch (error) {
    console.error("❌ Connection error:", error.message);
  }
}

testEndpoints();
