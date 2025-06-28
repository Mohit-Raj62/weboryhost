const axios = require("axios");

const testLogin = async () => {
  const baseURL = "http://localhost:5002";

  console.log("🚀 Starting comprehensive login test...\n");

  try {
    // Step 1: Test server connection
    console.log("1. Testing server connection...");
    const healthResponse = await axios.get(`${baseURL}/api/health`);
    console.log("✅ Server is running");

    // Step 2: Test admin login
    console.log("\n2. Testing admin login...");
    const loginResponse = await axios.post(`${baseURL}/api/admin/login`, {
      email: "admin@webory.com",
      password: "admin123",
    });

    console.log("✅ Login successful!");
    console.log("📝 Response status:", loginResponse.status);
    console.log("🎫 Token received:", !!loginResponse.data.token);
    console.log("📏 Token length:", loginResponse.data.token?.length);

    if (!loginResponse.data.token) {
      console.log("❌ No token in response");
      return;
    }

    const token = loginResponse.data.token;

    // Step 3: Test token format
    console.log("\n3. Testing token format...");
    const tokenParts = token.split(".");
    console.log("📋 Token parts:", tokenParts.length);
    if (tokenParts.length === 3) {
      console.log("✅ Token format is correct (JWT)");
    } else {
      console.log("❌ Token format is incorrect");
    }

    // Step 4: Test admin authentication
    console.log("\n4. Testing admin authentication...");
    const authResponse = await axios.get(`${baseURL}/api/admin/test-auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Admin authentication successful!");
    console.log("👤 Admin details:", authResponse.data.admin);

    // Step 5: Test dashboard access
    console.log("\n5. Testing dashboard access...");
    const dashboardResponse = await axios.get(`${baseURL}/api/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Dashboard access successful!");
    console.log("📊 Dashboard data received:", !!dashboardResponse.data);

    console.log("\n🎉 All tests passed! Login system is working correctly.");
    console.log("\n📋 Next steps:");
    console.log("1. Go to: http://localhost:5173/admin/login");
    console.log("2. Use: admin@webory.com / admin123");
    console.log("3. You should be redirected to dashboard");
  } catch (error) {
    console.error("❌ Test failed:", error.message);

    if (error.response) {
      console.error("📄 Response status:", error.response.status);
      console.error("📄 Response data:", error.response.data);
    }

    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure server is running on port 5002");
    console.log("2. Check if admin account exists");
    console.log("3. Verify JWT_SECRET is set");
  }
};

testLogin();
