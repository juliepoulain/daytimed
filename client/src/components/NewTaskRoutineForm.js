import React, { useState, useEffect } from "react";

function NewTaskRoutineForm({
  userId,
  setAddTask,
  setSuccess,
  routineId,
  routineName,
}) {
  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [timer, setTimer] = useState(null);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedTaskData, setSelectedTaskData] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`/api/tasktemplates`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ""}${
      hours > 0 && minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/api/tasktemplates/${selectedTask}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((data) => {
        setSelectedTaskData(data);
      });
  }

  console.log(selectedTaskData);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
        >
          <option>Select One:</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.task_name}: {formatTime(task.timer_length)}
            </option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default NewTaskRoutineForm;
