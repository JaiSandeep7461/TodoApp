// src/components/TodoForm.jsx
// Controlled input form for adding a new todo

import { useState } from "react";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle(""); // clear after adding
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
    >
      <input
        type="text"
        placeholder="Add a todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #374151",
          background: "#020617",
          color: "#e5e7eb",
          outline: "none"
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 14px",
          borderRadius: "8px",
          border: "none",
          background: "#22c55e",
          color: "#022c22",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
