const axios = require("axios");

const BASE_URL = "http://localhost:5002";

async function loginAdmin() {
  console.log("🔐 Logging in as admin...");

  try {
    const loginData = {
      email: "admin@webory.com",
      password: "admin123",
    };

    console.log("📧 Email:", loginData.email);
    console.log("🔑 Password:", loginData.password);

    const response = await axios.post(`${BASE_URL}/api/admin/login`, loginData);

    console.log("✅ Login successful!");
    console.log("🎫 Token:", response.data.token);
    console.log("👤 Admin:", response.data.admin);

    // Test the token with a protected endpoint
    console.log("\n🧪 Testing token with protected endpoint...");

    const testResponse = await axios.get(
      `${BASE_URL}/api/support-tickets/admin/stats`,
      {
        headers: { Authorization: `Bearer ${response.data.token}` },
      }
    );

    console.log("✅ Token works! Stats response:", testResponse.data);

    console.log("\n📋 Instructions:");
    console.log("1. Copy the token above");
    console.log("2. Open browser developer tools (F12)");
    console.log("3. Go to Application/Storage tab");
    console.log("4. Find Local Storage for your site");
    console.log('5. Add a new key: "adminToken"');
    console.log("6. Set the value to the token above");
    console.log("7. Refresh the page");
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
  }
}

loginAdmin();
