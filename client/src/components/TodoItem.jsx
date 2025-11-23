// src/components/TodoItem.jsx
// Single todo item with edit, toggle, delete

import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(todo.id, editTitle);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 10px",
        borderRadius: "10px",
        background: "#020617",
        marginBottom: "8px",
        border: "1px solid #1f2937"
      }}
    >
      {/* Completed checkbox */}
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: "8px" }}
      />

      {/* Title / edit input */}
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setIsEditing(false);
              setEditTitle(todo.title);
            }
          }}
          style={{
            flex: 1,
            padding: "4px 8px",
            borderRadius: "6px",
            border: "1px solid #374151",
            background: "#020617",
            color: "#e5e7eb",
            marginRight: "8px"
          }}
        />
      ) : (
        <span
          style={{
            flex: 1,
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#9ca3af" : "#e5e7eb"
          }}
        >
          {todo.title}
        </span>
      )}

      {/* Edit / Save button */}
      {isEditing ? (
        <button
          onClick={handleSave}
          style={{
            marginRight: "6px",
            border: "none",
            borderRadius: "6px",
            padding: "4px 8px",
            cursor: "pointer",
            background: "#22c55e",
            color: "#022c22",
            fontSize: "12px"
          }}
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          style={{
            marginRight: "6px",
            border: "none",
            borderRadius: "6px",
            padding: "4px 8px",
            cursor: "pointer",
            background: "#38bdf8",
            color: "#02131f",
            fontSize: "12px"
          }}
        >
          Edit
        </button>
      )}

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          border: "none",
          borderRadius: "6px",
          padding: "4px 8px",
          cursor: "pointer",
          background: "#f97373",
          color: "#450a0a",
          fontSize: "12px"
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
