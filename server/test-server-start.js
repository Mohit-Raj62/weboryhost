const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/test`);
});
