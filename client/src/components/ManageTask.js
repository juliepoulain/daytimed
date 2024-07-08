import React, { useState, useEffect } from "react";
import NewTaskForm from "./NewTaskForm";
import EditTaskForm from "./EditTaskForm";

function ManageTask({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editSuccess, setEditSuccess] = useState(null);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ""}${
      hours > 0 && minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleClick = (task) => {
    setAddTask(task);
    setSuccess(null);
    setEditSuccess(null)
  };

  const handleEditClick = (task) => {
    setEditTask(task.id);
    setEditSuccess(null)
  };

  useEffect(() => {
    fetch(`/api/tasktemplates/users/${userId}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((data) => {
        setTasks(data);
      });
  }, [userId]);

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    fetch(`/api/tasktemplates/${taskId}`, { method: "DELETE" }).then(() => {});
  };

  return (
    <div>
      <h1>MY TASKS</h1>
      <button className="button-normal" onClick={() => handleClick(tasks)}>
        CREATE NEW TASK
      </button>
      {addTask && (
        <NewTaskForm
          setTasks={setTasks}
          tasks={tasks}
          userId={userId}
          setAddTask={setAddTask}
          addTask={addTask}
          success={success}
          setSuccess={setSuccess}
        />
      )}
      {success && <p>{success}</p>}
      {editSuccess && <p>{editSuccess}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="card">
            <h3>{task.task_name}</h3>
            {task.task_note ? (
              <p>
                <strong>Task Note:</strong> {task.task_note}
              </p>
            ) : (
              <></>
            )}
            <p>
              <strong>Timer Length: </strong>
              {formatTime(task.timer_length)}
            </p>
            <button className="button-normal" onClick={() => handleEditClick(task)}>
              Edit Task
            </button>
            <button
              className="button-normal"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete Task
            </button>
            {editTask == task.id ? (
              <EditTaskForm
                task={task}
                userId={userId}
                setEditSuccess={setEditSuccess}
                setEditTask={setEditTask}
                tasks={tasks}
                setTasks={setTasks}
              />
            ) : (<></>)
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageTask;
