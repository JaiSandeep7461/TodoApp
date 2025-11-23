// src/App.jsx
// Main app component: handles state and talks to API

import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  updateTodo
} from "./api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);     // list of todos
  const [loading, setLoading] = useState(true); // loading flag
  const [error, setError] = useState("");       // error message

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      setTodos(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  // Run once on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAddTodo = async (title) => {
    if (!title.trim()) return;
    try {
      const res = await createTodo(title.trim());
      // Add new todo at the top
      setTodos((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to add todo");
    }
  };

  // Toggle todo completed state
  const handleToggleTodo = async (id) => {
    try {
      const res = await toggleTodo(id);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to toggle todo");
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete todo");
    }
  };

  // Edit todo title
  const handleEditTodo = async (id, newTitle) => {
    if (!newTitle.trim()) return;
    try {
      const res = await updateTodo(id, { title: newTitle.trim() });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update todo");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px",
        background: "#020617",
        color: "#f9fafb"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#020617",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          border: "1px solid #1f2937"
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "16px" }}>
          Todo App
        </h1>

        {/* Form to add new todo */}
        <TodoForm onAdd={handleAddTodo} />

        {loading ? (
          <p style={{ marginTop: "16px" }}>Loading...</p>
        ) : error ? (
          <p style={{ marginTop: "16px", color: "#f97373" }}>{error}</p>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
