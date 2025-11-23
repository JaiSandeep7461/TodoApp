// src/components/TodoList.jsx
// Renders list of TodoItem components

import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <p style={{ marginTop: "8px", color: "#6b7280" }}>
        No todos yet.
      </p>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
