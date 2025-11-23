// src/middleware/errorHandler.js
// Centralized error handling for Express

// 404 handler - called if no route matches
const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global error handler - catches all thrown errors
const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);

  // Use existing statusCode if set, otherwise default to 500
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Server Error",
    // Only show stack in non-production
    stack: process.env.NODE_ENV === "production" ? "🥲" : err.stack
  });
};

module.exports = { notFound, errorHandler };
