-- mysql/init.sql

-- Create database if it doesn't exist (safety)
CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;

-- Create todos table if it doesn't exist
CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
