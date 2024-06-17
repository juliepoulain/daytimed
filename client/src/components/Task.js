import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Task() {
  const { routineId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState({})
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); 
    const minutes = Math.floor((seconds % 3600) / 60); 
    const remainingSeconds = seconds % 60; 
      return `${hours > 0 ? `${hours}:` : ""}${
      hours > 0 && minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
        setTasks(data.taskroutines)
        setData(data)
      });
  }, [routineId]);

  return (
    <div>
      <h2>{data.routine_name}</h2>
      <button className="button-link-match">ADD TASKS TO THIS ROUTINE</button>
      <br />
      <Link to={`/routines`} className="button-link">Return to Routines</Link>
      <Link to={`/manage-tasks`} className="button-link">Manage All Tasks</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="card">
            <h2>{task.tasktemplates.task_name}</h2>
            <p><strong>Timer Length: </strong>
            {formatTime(task.tasktemplates.timer_length)}</p>
            {task.tasktemplates.task_note ? (
              <p>
                <strong>Task Note:</strong> {task.tasktemplates.task_note}
              </p>
            ) : (
              <></>
            )}
            <button className="button-normal">REMOVE TASK</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Task;
