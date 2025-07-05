// Test to check jobId format and database match
const testJobId = async () => {
  const testData = {
    jobId: "507f1f77bcf86cd799439011", // This should match database
    jobTitle: "Senior Frontend Developer",
    department: "Engineering",
    candidateName: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    resume: "https://example.com/resume",
    coverLetter: "Test cover letter",
    portfolio: "https://example.com/portfolio",
    experience: "3-5 years",
    skills: ["React", "JavaScript"],
  };

  try {
    console.log("Testing with jobId:", testData.jobId);
    console.log("JobId type:", typeof testData.jobId);

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
    } else {
      console.log("❌ Application failed:", result.message);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

testJobId();
