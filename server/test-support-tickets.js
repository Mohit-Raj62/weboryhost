const mongoose = require("mongoose");
const SupportTicket = require("./models/SupportTicket");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function testSupportTickets() {
  try {
    console.log("Testing support ticket functionality...");

    // Test 1: Create a sample ticket
    const newTicket = new SupportTicket({
      subject: "Test Ticket - API Issue",
      email: "test@example.com",
      message:
        "This is a test ticket to verify the support ticket system is working properly.",
      priority: "medium",
      status: "open",
    });

    const savedTicket = await newTicket.save();
    console.log("✅ Created test ticket:", savedTicket._id);

    // Test 2: Fetch all tickets
    const allTickets = await SupportTicket.find({});
    console.log("✅ Found tickets:", allTickets.length);

    // Test 3: Get ticket stats
    const stats = await SupportTicket.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    console.log("✅ Ticket stats:", stats);

    // Test 4: Update ticket status
    await SupportTicket.findByIdAndUpdate(savedTicket._id, {
      status: "in-progress",
    });
    console.log("✅ Updated ticket status");

    // Test 5: Add response to ticket
    const ticket = await SupportTicket.findById(savedTicket._id);
    ticket.responses.push({
      responder: null, // For now, no admin ID
      message: "This is a test response from the admin team.",
    });
    await ticket.save();
    console.log("✅ Added response to ticket");

    console.log("🎉 All support ticket tests passed!");
  } catch (error) {
    console.error("❌ Error testing support tickets:", error);
  } finally {
    mongoose.connection.close();
  }
}

testSupportTickets();
