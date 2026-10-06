import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("studentTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "Pending") {
      return !item.completed;
    }

    if (filter === "Completed") {
      return item.completed;
    }

    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((item) => item.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>Student Task Manager</h1>
          <p>Organize your tasks and stay productive.</p>
        </header>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(event) => setTask(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />

          <button className="add-button" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="stats">
          <div className="stat-box">
            <strong>{totalTasks}</strong>
            <span>Total</span>
          </div>

          <div className="stat-box">
            <strong>{pendingTasks}</strong>
            <span>Pending</span>
          </div>

          <div className="stat-box">
            <strong>{completedTasks}</strong>
            <span>Completed</span>
          </div>
        </div>

        <div className="filters">
          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={filter === "Pending" ? "active" : ""}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>

          <button
            className={filter === "Completed" ? "active" : ""}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty">No tasks available.</p>
          ) : (
            filteredTasks.map((item) => (
              <div className="task" key={item.id}>
                <button
                  className={`check-button ${
                    item.completed ? "checked" : ""
                  }`}
                  onClick={() => toggleTask(item.id)}
                >
                  {item.completed ? "✓" : ""}
                </button>

                <span>{item.text}</span>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(item.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;