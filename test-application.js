// Test script to verify application submission
const testApplication = async () => {
  const testData = {
    jobId: "507f1f77bcf86cd799439011",
    jobTitle: "Senior Frontend Developer",
    department: "engineering",
    candidateName: "Test Candidate",
    email: "test@example.com",
    phone: "+91-9876543210",
    resume: "https://linkedin.com/in/test",
    coverLetter: "This is a test application",
    portfolio: "https://test-portfolio.com",
    experience: "3-5 years",
    skills: ["React", "JavaScript", "Node.js"],
  };

  try {
    console.log("Testing application submission...");
    console.log("Data:", testData);

    const response = await fetch(
      "https://webory.onrender.com/api/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      }
    );

    const result = await response.json();
    console.log("Response:", result);

    if (result.success) {
      console.log("✅ Application submitted successfully!");
      console.log("Application ID:", result.data._id);
    } else {
      console.log("❌ Application submission failed:", result.message);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

// Run the test
testApplication();
