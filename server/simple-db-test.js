const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function simpleDbTest() {
  console.log("🧪 Simple Database Test...");

  try {
    // Step 1: Connect
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
    console.log("📊 Database:", mongoose.connection.name);
    console.log("🌐 Host:", mongoose.connection.host);

    // Step 2: Create a simple test model
    console.log("\n2. Creating test model...");
    const TestSchema = new mongoose.Schema({
      name: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
    });

    const TestModel = mongoose.model("Test", TestSchema);

    // Step 3: Try to save data
    console.log("\n3. Trying to save data...");
    const testData = new TestModel({
      name: "Test User",
      message: "This is a test message - " + new Date().toISOString(),
    });

    console.log("📝 Data to save:", {
      name: testData.name,
      message: testData.message,
    });

    const savedData = await testData.save();
    console.log("✅ Data saved successfully!");
    console.log("🆔 Saved ID:", savedData._id);
    console.log("📅 Created at:", savedData.timestamp);

    // Step 4: Try to read data
    console.log("\n4. Trying to read data...");
    const foundData = await TestModel.findById(savedData._id);
    if (foundData) {
      console.log("✅ Data read successfully!");
      console.log("📝 Found data:", {
        name: foundData.name,
        message: foundData.message,
        id: foundData._id,
      });
    } else {
      console.log("❌ Could not read saved data!");
    }

    // Step 5: Count documents
    console.log("\n5. Counting documents...");
    const count = await TestModel.countDocuments();
    console.log("📊 Total documents in collection:", count);

    // Step 6: List all documents
    console.log("\n6. Listing all documents...");
    const allDocs = await TestModel.find();
    console.log("📋 All documents:");
    allDocs.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.name} - ${doc.message}`);
    });

    // Step 7: Clean up
    console.log("\n7. Cleaning up test data...");
    await TestModel.deleteMany({});
    console.log("✅ Test data cleaned up");

    console.log("\n🎉 Database test completed successfully!");
    console.log("✅ Database connection is working");
    console.log("✅ Data can be saved and read");
  } catch (error) {
    console.error("❌ Database test failed:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
}

simpleDbTest();
