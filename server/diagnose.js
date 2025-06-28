const mongoose = require("mongoose");
const axios = require("axios");

console.log("🔍 Admin Dashboard Diagnostic Tool\n");

// Check 1: MongoDB Connection
console.log("1. Testing MongoDB Connection...");
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory"
  )
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    console.log("   Database:", mongoose.connection.name);
    console.log("   Host:", mongoose.connection.host);

    // Check 2: Admin Model
    const Admin = require("./models/Admin");
    console.log("\n2. Testing Admin Model...");
    return Admin.findOne({});
  })
  .then((admin) => {
    if (admin) {
      console.log("✅ Admin model working, found admin account");
    } else {
      console.log("⚠️  No admin accounts found - will create test admin");
    }

    // Check 3: Server Endpoints
    console.log("\n3. Testing Server Endpoints...");
    return testEndpoints();
  })
  .catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });

async function testEndpoints() {
  const baseURL = "http://localhost:5002";

  try {
    // Test health endpoint
    const healthResponse = await axios.get(`${baseURL}/api/health`);
    console.log("✅ Health endpoint working");

    // Test admin login endpoint
    try {
      await axios.post(`${baseURL}/api/admin/login`, {});
    } catch (error) {
      if (error.response?.status === 400) {
        console.log("✅ Admin login endpoint working");
      } else {
        console.log("❌ Admin login endpoint error:", error.response?.status);
      }
    }

    // Test dashboard endpoint
    try {
      await axios.get(`${baseURL}/api/admin/stats`);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("✅ Dashboard endpoint working (requires auth)");
      } else {
        console.log("❌ Dashboard endpoint error:", error.response?.status);
      }
    }

    console.log("\n🎉 All tests completed!");
    console.log("\n📋 Next Steps:");
    console.log("1. If server is not running, start it: npm run dev");
    console.log("2. Create test admin: npm run create-test-admin");
    console.log("3. Access admin login: http://localhost:5173/admin/login");
    console.log("4. Use credentials: admin@webory.com / admin123");
  } catch (error) {
    console.error("❌ Server not responding:", error.message);
    console.log('\n💡 Solution: Start the server with "npm run dev"');
  }
}
