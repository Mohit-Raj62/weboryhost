const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function testDatabaseConnection() {
  console.log("🔍 Testing Database Connection...");

  try {
    // Test 1: Connect to MongoDB
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully!");
    console.log("📊 Database:", mongoose.connection.name);
    console.log("🌐 Host:", mongoose.connection.host);
    console.log("🔗 Connection state:", mongoose.connection.readyState);

    // Test 2: Check if we can write to database
    console.log("\n2. Testing database write...");

    // Create a simple test document
    const TestModel = mongoose.model(
      "Test",
      new mongoose.Schema({
        message: String,
        timestamp: { type: Date, default: Date.now },
      })
    );

    const testDoc = new TestModel({
      message: "Test database write - " + new Date().toISOString(),
    });

    const savedDoc = await testDoc.save();
    console.log("✅ Database write successful!");
    console.log("📝 Saved document ID:", savedDoc._id);
    console.log("📝 Message:", savedDoc.message);

    // Test 3: Check if we can read from database
    console.log("\n3. Testing database read...");
    const foundDoc = await TestModel.findById(savedDoc._id);
    if (foundDoc) {
      console.log("✅ Database read successful!");
      console.log("📝 Found document:", foundDoc.message);
    } else {
      console.log("❌ Database read failed!");
    }

    // Test 4: Clean up test data
    console.log("\n4. Cleaning up test data...");
    await TestModel.findByIdAndDelete(savedDoc._id);
    console.log("✅ Test data cleaned up");

    console.log("\n🎉 Database connection and operations are working!");
  } catch (error) {
    console.error("❌ Database test failed:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
}

testDatabaseConnection();
