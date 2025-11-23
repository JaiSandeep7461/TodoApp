// src/api.js
// Central axios instance and API helper functions

import axios from "axios";

// Backend base URL
const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL
});

// GET /api/todos
export const getTodos = () => api.get("/todos");

// POST /api/todos
export const createTodo = (title) => api.post("/todos", { title });

// PUT /api/todos/:id
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);

// PATCH /api/todos/:id/toggle
export const toggleTodo = (id) => api.patch(`/todos/${id}/toggle`);

// DELETE /api/todos/:id
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
