import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Routine({ phone }) {
  const [routines, setRoutines] = useState([]);
  const formattedPhone = phone.replace(/\D/g, "");
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); 
    const minutes = Math.floor((seconds % 3600) / 60); 
    const remainingSeconds = seconds % 60; 
      return `${hours > 0 ? `${hours}:` : ""}${
      hours > 0 && minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
      <button className="button-normal">CREATE NEW ROUTINE</button>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id} className="card">
            <h3>{routine.routine_name}</h3>
            Total Timer Length: {formatTime(routine.total_timer_length)}
            <br />
            <Link to={`/routinetasks/${routine.id}`} className="button-link">
              View/Add Tasks
            </Link>
            <br />
            <button className="button-normal">Rename Routine</button>
            <button className="button-normal">Delete Routine</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Routine;
