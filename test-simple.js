// Simple test to check if the applications route exists
const testRoute = async () => {
  try {
    console.log("Testing if applications route exists...");

    // First test the health endpoint
    const healthResponse = await fetch(
      "https://webory.onrender.com/api/health"
    );
    const healthData = await healthResponse.json();
    console.log("Health check:", healthData);

    // Then test the applications endpoint
    const response = await fetch(
      "https://webory.onrender.com/api/applications",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

testRoute();
