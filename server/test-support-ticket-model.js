const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");

const MONGODB_URI =
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory";

async function testSupportTicketModel() {
  console.log("🧪 Testing SupportTicket Model...");

  try {
    // Step 1: Connect to database
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Step 2: Check if SupportTicket model exists
    console.log("\n2. Checking SupportTicket model...");
    console.log("📋 Model name:", SupportTicket.modelName);
    console.log("📋 Schema fields:", Object.keys(SupportTicket.schema.paths));

    // Step 3: Try to create a support ticket
    console.log("\n3. Creating a support ticket...");
    const ticketData = {
      subject: "Test Support Ticket",
      email: "test@example.com",
      message: "This is a test support ticket to check if the model works.",
      priority: "high",
      status: "open",
    };

    console.log("📝 Ticket data to save:", ticketData);

    const ticket = new SupportTicket(ticketData);
    console.log("📋 Ticket object created:", ticket);

    // Step 4: Try to save the ticket
    console.log("\n4. Saving the ticket...");
    const savedTicket = await ticket.save();
    console.log("✅ Ticket saved successfully!");
    console.log("🆔 Saved ticket ID:", savedTicket._id);
    console.log("📝 Subject:", savedTicket.subject);
    console.log("📧 Email:", savedTicket.email);
    console.log("🔴 Status:", savedTicket.status);
    console.log("⚡ Priority:", savedTicket.priority);
    console.log("📅 Created at:", savedTicket.createdAt);

    // Step 5: Try to find the saved ticket
    console.log("\n5. Finding the saved ticket...");
    const foundTicket = await SupportTicket.findById(savedTicket._id);
    if (foundTicket) {
      console.log("✅ Ticket found successfully!");
      console.log("📝 Found ticket:", {
        id: foundTicket._id,
        subject: foundTicket.subject,
        email: foundTicket.email,
        status: foundTicket.status,
        priority: foundTicket.priority,
      });
    } else {
      console.log("❌ Could not find saved ticket!");
    }

    // Step 6: Count all tickets
    console.log("\n6. Counting all tickets...");
    const ticketCount = await SupportTicket.countDocuments();
    console.log("📊 Total tickets in database:", ticketCount);

    // Step 7: List all tickets
    console.log("\n7. Listing all tickets...");
    const allTickets = await SupportTicket.find();
    console.log("📋 All tickets:");
    allTickets.forEach((ticket, index) => {
      console.log(
        `${index + 1}. ${ticket.subject} - ${ticket.status} (${
          ticket.priority
        })`
      );
      console.log(`   Email: ${ticket.email}`);
      console.log(`   ID: ${ticket._id}`);
      console.log("");
    });

    // Step 8: Test update operation
    console.log("\n8. Testing update operation...");
    const updateResult = await SupportTicket.findByIdAndUpdate(
      savedTicket._id,
      { status: "in-progress" },
      { new: true }
    );

    if (updateResult) {
      console.log("✅ Update successful!");
      console.log("🔄 New status:", updateResult.status);
    } else {
      console.log("❌ Update failed!");
    }

    // Step 9: Test delete operation
    console.log("\n9. Testing delete operation...");
    const deleteResult = await SupportTicket.findByIdAndDelete(savedTicket._id);
    if (deleteResult) {
      console.log("✅ Delete successful!");
    } else {
      console.log("❌ Delete failed!");
    }

    // Step 10: Final count
    console.log("\n10. Final ticket count...");
    const finalCount = await SupportTicket.countDocuments();
    console.log("📊 Final ticket count:", finalCount);

    console.log("\n🎉 SupportTicket model test completed!");

    if (finalCount === 0) {
      console.log("✅ All operations working correctly");
    } else {
      console.log("⚠️ Some tickets still in database");
    }
  } catch (error) {
    console.error("❌ SupportTicket model test failed:", error);
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

testSupportTicketModel();
