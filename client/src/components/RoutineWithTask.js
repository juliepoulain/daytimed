import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewTaskToRoutineForm from "./NewTaskRoutineForm";
import { Link } from "react-router-dom";

function RoutineWithTask({userId}) {
  const { routineId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState({});
  const [addTask, setAddTask] = useState(null);
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

  const handleDeleteTaskFromRoutine = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    fetch(`/api/tasktemplates/${taskId}`, { method: "DELETE" }).then(() => {});
  };

  const handleAddTaskToRoutine = (routineId) => {
    setAddTask(routineId);
    setSuccess(null);
    setEditSuccess(null)
  };

  useEffect(() => {
    fetch(`/api/routinetemplates/${routineId}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((data) => {
        setTasks(data.taskroutines);
        setData(data);
      });
  }, [routineId]);

  return (
    <div>
      <h2>{data.routine_name}</h2>
      <button
        className="button-link-match"
        onClick={() => handleAddTaskToRoutine(routineId)}
      >
        ADD TASKS TO THIS ROUTINE
      </button>
      {addTask && (
        <NewTaskToRoutineForm
          setPageTasks={setTasks}
          pageTasks={tasks}
          userId={userId}
          setAddTask={setAddTask}
          addTask={addTask}
          success={success}
          setSuccess={setSuccess}
          routineId={routineId}
          routineName={data.routine_name}
        />
      )}
      {success && <p>{success}</p>}
      {editSuccess && <p>{editSuccess}</p>}
      <br />
      <Link to={`/routines`} className="button-link">
        Return to Routines
      </Link>
      <Link to={`/manage-tasks`} className="button-link">
        Manage All Tasks
      </Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="card">
            <h2>{task.tasktemplates.task_name}</h2>
            <p>
              <strong>Timer Length: </strong>
              {formatTime(task.tasktemplates.timer_length)}
            </p>
            {task.tasktemplates.task_note ? (
              <p>
                <strong>Task Note:</strong> {task.tasktemplates.task_note}
              </p>
            ) : (
              <></>
            )}
            <button
              className="button-normal"
              onClick={() => handleDeleteTaskFromRoutine(task.id)}
            >
              REMOVE TASK FROM ROUTINE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoutineWithTask;
