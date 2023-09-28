import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (tasksToSave) => {
    localStorage.setItem("tasks", JSON.stringify(tasksToSave));
  };

  const addTask = () => {
    if (taskText.trim() === "") {
      alert("Task cannot be empty");
      return;
    }

    if (tasks.length >= 5) {
      alert("You can only add 5 tasks.");
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      text: taskText,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setTaskText("");
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const startEdit = (taskId) => {
    setEditingTaskId(taskId);
  };

  const finishEdit = () => {
    setEditingTaskId(null);
  };

  const canAddMoreTasks = tasks.length < 5;

  return (
    <div className="App">
      <h1>Schedule your day!</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask} disabled={!canAddMoreTasks}>
          Add
        </button>
        {!canAddMoreTasks && <p>You can only add 5 tasks.</p>}
      </div>
      <ul className="task-list">
        <h2>To-do</h2>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <span className="task-number">{index + 1}.</span>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) =>
                    setTasks((prevTasks) =>
                      prevTasks.map((prevTask) =>
                        prevTask.id === task.id
                          ? { ...prevTask, text: e.target.value }
                          : prevTask
                      )
                    )
                  }
                  onBlur={finishEdit}
                  autoFocus
                />
              </>
            ) : (
              <>
                {task.text}
                <div className="task-actions">
                  <button onClick={() => startEdit(task.id)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
