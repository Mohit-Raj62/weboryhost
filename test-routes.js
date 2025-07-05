// Test to check available routes
const testRoutes = async () => {
  const routes = [
    "/api/health",
    "/api/auth/login",
    "/api/admin/login",
    "/api/applications",
    "/api/applications/recent",
    "/api/contact",
    "/api/test",
  ];

  for (const route of routes) {
    try {
      console.log(`\nTesting route: ${route}`);
      const response = await fetch(`https://webory.onrender.com${route}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`Status: ${response.status}`);
      const data = await response.json();
      console.log(`Response:`, data);
    } catch (error) {
      console.error(`Error testing ${route}:`, error.message);
    }
  }
};

testRoutes();
