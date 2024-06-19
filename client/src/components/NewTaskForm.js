import React, { useState, useEffect } from "react";

function NewTaskForm({ tasks, userId, setTasks, setAddTask, setSuccess }) {
  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [timer, setTimer] = useState(null);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      task_name: taskName,
      task_note: taskNote,
      timer_length: timer,
      user_id: userId,
    };

    fetch(`/api/tasktemplates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to add task");
      })
      .then((newTask) => {
        handleAddTask(newTask);
        setTaskName("");
        setTaskNote("");
        setTimer("");
        setSuccess("Task Created Successfully!");
        setAddTask(null);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }

  return (
    <div>
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
        <button type="submit">Create Task</button>
        <button onClick={() => setAddTask(null)}>Cancel</button>{" "}
      </form>
    </div>
  );
}

export default NewTaskForm;
