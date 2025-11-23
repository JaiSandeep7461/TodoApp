// src/index.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const pool = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Todo API running with MySQL" });
});

app.use("/api/todos", todoRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Try connecting to DB with retries, but DON'T kill the process
async function waitForDb(maxRetries = 20, delayMs = 5000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await pool.getConnection();
      await conn.ping();
      conn.release();
      console.log(`✅ MySQL connected (attempt ${attempt})`);
      return;
    } catch (err) {
      console.error(
        `❌ MySQL connect failed (attempt ${attempt}/${maxRetries}):`,
        err.message
      );
      if (attempt === maxRetries) {
        console.error(
          "⚠️ Giving up on DB startup check; server will keep running and will still retry on queries."
        );
        return;
      }
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  waitForDb();
});
