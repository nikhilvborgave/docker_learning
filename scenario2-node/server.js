const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hey! This is Nikhil's API running inside Docker!",
    status: "live",
    container: "node:lts-alpine3.23",
    port: PORT
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime().toFixed(2) + " seconds"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
