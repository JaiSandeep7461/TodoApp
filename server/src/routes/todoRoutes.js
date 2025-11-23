// src/routes/todoRoutes.js
// Defines routes for Todo operations and maps them to controller functions

const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo
} = require("../controllers/todoController");

// GET /api/todos - list all todos
router.get("/", getTodos);

// POST /api/todos - create a new todo
router.post("/", createTodo);

// PUT /api/todos/:id - update a todo
router.put("/:id", updateTodo);

// PATCH /api/todos/:id/toggle - toggle completed status
router.patch("/:id/toggle", toggleTodo);

// DELETE /api/todos/:id - delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
