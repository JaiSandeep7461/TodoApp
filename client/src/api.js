import axios from "axios";

// 1. Read base URL from environment variable (VITE_API_URL)
// 2. Default fallback uses the current hostname (for local dev)
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  `http://${window.location.hostname}:5000/api`;

console.log("API BASE URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTodos = () => api.get("/todos");
export const createTodo = (title) => api.post("/todos", { title });
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const toggleTodo = (id) => api.patch(`/todos/${id}/toggle`);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
