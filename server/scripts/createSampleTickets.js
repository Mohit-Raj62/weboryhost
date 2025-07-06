const mongoose = require("mongoose");
const SupportTicket = require("../models/SupportTicket");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const sampleTickets = [
  {
    subject: "Login Issue - Cannot access account",
    email: "user1@example.com",
    message:
      "I am unable to login to my account. Getting an error message when I try to access the dashboard.",
    priority: "high",
    status: "open",
  },
  {
    subject: "Payment Processing Problem",
    email: "user2@example.com",
    message:
      "My payment was deducted but the service is not activated. Please help resolve this issue.",
    priority: "high",
    status: "in-progress",
  },
  {
    subject: "Website Loading Slowly",
    email: "user3@example.com",
    message:
      "The website is taking too long to load. This is affecting my work productivity.",
    priority: "medium",
    status: "open",
  },
  {
    subject: "Feature Request - Dark Mode",
    email: "user4@example.com",
    message:
      "Would it be possible to add a dark mode option to the interface? This would be very helpful.",
    priority: "low",
    status: "open",
  },
  {
    subject: "Billing Question",
    email: "user5@example.com",
    message:
      "I have a question about my monthly billing. Can you explain the charges?",
    priority: "medium",
    status: "resolved",
  },
];

async function createSampleTickets() {
  try {
    console.log("Creating sample support tickets...");

    // Clear existing sample tickets
    await SupportTicket.deleteMany({});

    // Create new sample tickets
    const tickets = await SupportTicket.insertMany(sampleTickets);

    console.log(`✅ Created ${tickets.length} sample support tickets`);
    console.log("Sample tickets created successfully!");

    // Display the created tickets
    tickets.forEach((ticket, index) => {
      console.log(
        `${index + 1}. ${ticket.subject} - ${ticket.status} (${
          ticket.priority
        })`
      );
    });
  } catch (error) {
    console.error("Error creating sample tickets:", error);
  } finally {
    mongoose.connection.close();
  }
}

createSampleTickets();
