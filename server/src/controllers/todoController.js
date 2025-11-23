// src/controllers/todoController.js

const pool = require("../config/db"); // THIS is the pool, not an object

const normalizeTodo = (row) => ({
  ...row,
  completed: !!row.completed
});

// GET /api/todos
exports.getTodos = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, completed, created_at FROM todos ORDER BY created_at DESC"
    );
    res.json(rows.map(normalizeTodo));
  } catch (err) {
    next(err);
  }
};

// POST /api/todos
exports.createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const [result] = await pool.query(
      "INSERT INTO todos (title) VALUES (?)",
      [title.trim()]
    );

    const [rows] = await pool.query(
      "SELECT id, title, completed, created_at FROM todos WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(normalizeTodo(rows[0]));
  } catch (err) {
    next(err);
  }
};

// PUT /api/todos/:id
exports.updateTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const { title, completed } = req.body;

    const [existingRows] = await pool.query(
      "SELECT id, title, completed, created_at FROM todos WHERE id = ?",
      [todoId]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const current = existingRows[0];

    const newTitle = title !== undefined ? title : current.title;
    const newCompleted =
      completed !== undefined ? completed : !!current.completed;

    await pool.query(
      "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
      [newTitle, newCompleted, todoId]
    );

    const [updatedRows] = await pool.query(
      "SELECT id, title, completed, created_at FROM todos WHERE id = ?",
      [todoId]
    );

    res.json(normalizeTodo(updatedRows[0]));
  } catch (err) {
    next(err);
  }
};

// PATCH /api/todos/:id/toggle
exports.toggleTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;

    const [existingRows] = await pool.query(
      "SELECT id, title, completed, created_at FROM todos WHERE id = ?",
      [todoId]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const current = existingRows[0];
    const toggled = !current.completed;

    await pool.query(
      "UPDATE todos SET completed = ? WHERE id = ?",
      [toggled, todoId]
    );

    const [updatedRows] = await pool.query(
      "SELECT id, title, completed, created_at FROM todos WHERE id = ?",
      [todoId]
    );

    res.json(normalizeTodo(updatedRows[0]));
  } catch (err) {
    next(err);
  }
};

// DELETE /api/todos/:id
exports.deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;

    const [existingRows] = await pool.query(
      "SELECT id FROM todos WHERE id = ?",
      [todoId]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await pool.query("DELETE FROM todos WHERE id = ?", [todoId]);

    res.json({ message: "Todo deleted" });
  } catch (err) {
    next(err);
  }
};
