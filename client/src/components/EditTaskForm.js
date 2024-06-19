import React, { useState, useEffect } from "react";

function EditTaskForm({
  task,
  userId,
  setEditSuccess,
  tasks,
  setEditTask,
  setTasks,
}) {
  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [timer, setTimer] = useState(null);
  const handleEditTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditTask(null);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const updatedTask = {
      task_name: taskName,
      task_note: taskNote,
      timer_length: timer,
      user_id: userId,
    };

    fetch(`/api/tasktemplates/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to update task");
      })
      .then((updatedTask) => {
        handleEditTask(updatedTask);
        setTaskName("");
        setTaskNote("");
        setTimer("");
        setEditSuccess("Task Updated!");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <input
        type="text"
        value={taskNote}
        onChange={(e) => setTaskNote(e.target.value)}
        placeholder="Task Note"
      />
      <input
        type="integer"
        value={timer}
        onChange={(e) => setTimer(e.target.value)}
        placeholder="Timer Length (seconds)"
      />
      <button type="submit">Update Task</button>
      <button onClick={() => setEditTask(null)}>Cancel</button>
    </form>
  );
}

export default EditTaskForm;
