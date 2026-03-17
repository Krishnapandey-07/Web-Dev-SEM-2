import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");

  // ✅ FIX 1: localStorage se tasks load karo
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");

  // ✅ FIX 2: tasks change hone par localStorage mein save karo
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  // Toggle Complete
  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Filter Logic
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="app-body">
      <div className="app-box">

        <h1 className="app-heading">📝 Task Filter App</h1>

        {/* Input */}
        <div className="input-row">
          <input
            className="task-input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Enter a task..."
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>

        {/* Filter Buttons */}
        <div className="filter-row">
          {["all", "completed", "pending"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats */}
        <p className="stats">
          Total: <strong>{tasks.length}</strong> &nbsp;|&nbsp; Completed:{" "}
          <strong>{tasks.filter((t) => t.completed).length}</strong> &nbsp;|&nbsp; Pending:{" "}
          <strong>{tasks.filter((t) => !t.completed).length}</strong>
        </p>

        {/* Task List */}
        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty-msg">
              {tasks.length === 0 ? "No tasks yet. Add one above!" : "No tasks match this filter."}
            </p>
          ) : (
            filteredTasks.map((t) => (
              <li
                key={t.id}
                className={`task-item ${t.completed ? "completed" : ""}`}
                onClick={() => toggleTask(t.id)}
              >
                <span style={{ marginRight: "10px" }}>{t.completed ? "✅" : "⬜"}</span>
                {t.text}
              </li>
            ))
          )}
        </ul>

      </div>
    </div>
  );
}

export default App;