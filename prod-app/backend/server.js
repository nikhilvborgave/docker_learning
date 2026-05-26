const express = require("express");
const { Pool } = require("pg");
const { createClient } = require("redis");

const app = express();
const PORT = 3000;

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  user: "postgres"
});

// Redis connection
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

redisClient.connect().catch(console.error);

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Hey! Production grade app running!",
    status: "live",
    services: {
      backend: "Node.js",
      database: "PostgreSQL",
      cache: "Redis",
      proxy: "Nginx"
    }
  });
});

app.get("/health", async (req, res) => {
  // Check PostgreSQL
  let dbStatus = "down";
  try {
    await pool.query("SELECT 1");
    dbStatus = "up";
  } catch (err) {
    dbStatus = "down - " + err.message;
  }

  // Check Redis
  let redisStatus = "down";
  try {
    await redisClient.ping();
    redisStatus = "up";
  } catch (err) {
    redisStatus = "down - " + err.message;
  }

  res.json({
    backend: "up",
    database: dbStatus,
    redis: redisStatus
  });
});

app.get("/db-test", async (req, res) => {
  try {
    // Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        visited_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Insert a visit
    await pool.query("INSERT INTO visits (visited_at) VALUES (NOW())");

    // Get total visits
    const result = await pool.query("SELECT COUNT(*) FROM visits");

    res.json({
      message: "PostgreSQL is working!",
      total_visits: result.rows[0].count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/redis-test", async (req, res) => {
  try {
    // Set a value in Redis
    await redisClient.set("last_visit", new Date().toISOString());

    // Get the value back
    const value = await redisClient.get("last_visit");

    res.json({
      message: "Redis is working!",
      last_visit: value
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
