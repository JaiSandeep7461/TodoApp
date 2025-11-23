// src/index.js
// Entry point of the Express server

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const todoRoutes = require("./routes/todoRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const pool = require("./config/db"); // this IS the pool now

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Simple API health check
app.get("/", (req, res) => {
  res.json({ message: "Todo API running with MySQL" });
});

// DB health check
app.get("/db-health", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    res.json({ status: "UP", message: "Database is connected" });
  } catch (err) {
    console.error("DB health check failed:", err.message);
    res.status(500).json({
      status: "DOWN",
      message: "Database is NOT connected"
    });
  }
});

// Todo routes
app.use("/api/todos", todoRoutes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Test DB once at startup, then start server
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MySQL Connection Failed:");
    console.error(err);
    process.exit(1);
  }
})();
