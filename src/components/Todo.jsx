import { useEffect, useState } from "react";

function handleKeyDown(e, action) {
  if (e.key === "Enter") {
    e.preventDefault();
    action();
  }
}

function Todo() {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  const [editingText, setEditingText] = useState("");
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("task")) || [];
    if (data) {
      setTask(data);
    }
  }, []);

  function handleaddTask() {
    if (!input.trim()) return;
    const taskWithId = { id: Date.now(), text: input.trim() };
    const updatedData = [...task, taskWithId];
    setTask(updatedData);
    localStorage.setItem("task", JSON.stringify(updatedData));
    setInput("");
  }

  function handleDeleteTask(id) {
    const updatedTask = task.filter((taskItems) => taskItems.id !== id);
    setTask(updatedTask);
    localStorage.setItem("task", JSON.stringify(updatedTask));
  }

  function handleStartEditing(taskItem) {
    setTaskId(taskItem.id);
    setEditingText(taskItem.text);
  }

  function handleEditTask(id) {
    const updatedData = task.map((taskItem) =>
      taskItem.id === id ? { ...taskItem, text: editingText.trim() || taskItem.text } : taskItem
    );
    setTask(updatedData);
    localStorage.setItem("task", JSON.stringify(updatedData));
    setTaskId(null);
    setEditingText("");
  }

  return (
    <div className="todo-wrap">
      <h1 className="todo-title">Tasks</h1>
      <p className="todo-subtitle">Add and manage your to-dos.</p>

      <div className="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, handleaddTask)}
        />
        <button type="button" className="btn-add" onClick={handleaddTask}>
          Add
        </button>
      </div>

      <div className="todo-list">
        {task.length === 0 ? (
          <div className="todo-empty">
            <p>No tasks yet</p>
            <p className="todo-empty-hint">Add one above to get started.</p>
          </div>
        ) : (
          task.map((taskItem) => (
            <div key={taskItem.id} className="todo-item">
              <div className="todo-item-content">
                {taskId === taskItem.id ? (
                  <input
                    type="text"
                    className="todo-item-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleEditTask(taskItem.id))}
                    autoFocus
                  />
                ) : (
                  <p className="todo-item-text">{taskItem.text}</p>
                )}
              </div>
              <div className="todo-item-actions">
                {taskId === taskItem.id ? (
                  <button
                    type="button"
                    className="btn-save"
                    onClick={() => handleEditTask(taskItem.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => handleStartEditing(taskItem)}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => handleDeleteTask(taskItem.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Todo;
