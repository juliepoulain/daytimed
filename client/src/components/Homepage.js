import React, { useState, useEffect } from "react";
import Countdown from "./Countdown"

function HomepageLogout({ phone }) {
  const [routines, setRoutines] = useState([]);
  const formattedPhone = phone.replace(/\D/g, "");

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
  console.log(routines);
  return (
    <>
      <div className="homepage">
        <h2>Select Routine</h2>
        <form>
          <select>
          {routines.map((routine) => (
          <option>
            {routine.routine_name}
          </option>
        ))}
          </select>
          <button>START TIMER</button>
        </form>
        <Countdown />
      </div>
    </>
  );
}

export default HomepageLogout;
