// src/config/db.js
// MySQL connection pool

const dotenv = require("dotenv");
dotenv.config(); // load .env here as well, just to be safe

const mysql = require("mysql2/promise");

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10
});

// Optional debug – remove once confirmed
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_NAME =", process.env.DB_NAME);

// Export ONLY the pool
module.exports = pool;
