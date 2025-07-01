module.exports = (app) => {
  app.get("/api/plugins/hello", (req, res) => {
    res.json({ message: "Hello from plugin!" });
  });
};
