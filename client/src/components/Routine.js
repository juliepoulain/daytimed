import React, { useState, useEffect } from "react";
import NewRoutineForm from "./NewRoutineForm";
import EditRoutineForm from "./EditRoutineForm";
import { Link } from "react-router-dom";

function Routine({ phone, userId }) {
  const [routines, setRoutines] = useState([]);
  const [addRoutine, setAddRoutine] = useState(null);
  const [editRoutine, setEditRoutine] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editSuccess, setEditSuccess] = useState(null);

  const formattedPhone = phone.replace(/\D/g, "");
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ""}${
      hours > 0 && minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleClick = (routine) => {
    setAddRoutine(routine);
    setSuccess(null);
    setEditSuccess(null);
  };

  const handleEditClick = (routine) => {
    setEditRoutine(routine.id);
    setEditSuccess(null);
  };

  const handleDeleteRoutine = (routineId) => {
    setRoutines(routines.filter((routine) => routine.id !== routineId));
    fetch(`/api/routinetemplates/${routineId}`, { method: "DELETE" }).then(
      () => {}
    );
  };

  useEffect(() => {
    fetch(`/api/users/phone/${formattedPhone}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((data) => {
        setRoutines(data.routinetemplates);
      });
  }, [phone]);

  return (
    <div>
      <h1>MY ROUTINES</h1>
      <button className="button-normal" onClick={() => handleClick(routines)}>
        CREATE NEW ROUTINE
      </button>
      {addRoutine && (
        <NewRoutineForm
          setRoutines={setRoutines}
          routines={routines}
          userId={userId}
          setAddRoutine={setAddRoutine}
          addRoutine={addRoutine}
          success={success}
          setSuccess={setSuccess}
        />
      )}
      {success && <p>{success}</p>}
      {editSuccess && <p>{editSuccess}</p>}
      <ul>
        {routines.map((routine) => (
          <li key={routine.id} className="card">
            <h3>{routine.routine_name}</h3>
            Total Timer Length: {formatTime(routine.total_timer_length)}
            <br />
            <Link to={`/routinetasks/${routine.id}`} className="button-link">
              View Tasks
            </Link>
            <br />
            <button
              className="button-normal"
              onClick={() => handleEditClick(routine)}
            >
              Rename Routine
            </button>
            <button
              className="button-normal"
              onClick={() => handleDeleteRoutine(routine.id)}
            >
              Delete Routine
            </button>
            {editRoutine == routine.id ? (
              <EditRoutineForm
                routine={routine}
                userId={userId}
                setEditSuccess={setEditSuccess}
                setEditRoutine={setEditRoutine}
                routines={routines}
                setRoutines={setRoutines}
              />
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Routine;
