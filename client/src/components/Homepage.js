import React, { useState, useEffect } from "react";
import Countdown from "./Countdown"

function Homepage({ phone }) {
  const [routines, setRoutines] = useState([]);
  const [taskRoutines, setTaskRoutines] = useState ([])
  const [cancelButton, setCancelButton] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState("")
  const [timerRun, setTimerRun] = useState(false)
  
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

  function handleChange(e) {
    setSelectedRoutine(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setCancelButton(true)
    setTimerRun(true)
    fetch(`/api/taskroutines/routine/${selectedRoutine}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok")
        }
        return r.json()
      })
      .then((data) => {
        setTaskRoutines(data)
      })
  }

  return (
    <>
      <div className="homepage">
        <h2>Select Routine</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <select value={selectedRoutine} onChange={(e) => handleChange(e)}>
            <option>Select One:</option>
          {routines.map((routine) => (
          <option key={routine.id} value={routine.id}>
            {routine.routine_name}
          </option>
        ))}
          </select>
          <button type="submit">START TIMER</button>
        </form>
        <Countdown timerRun={timerRun} setTimerRun={setTimerRun} setCancelButton={setCancelButton} cancelButton={cancelButton} taskRoutines={taskRoutines}/>
      </div>
    </>
  );
}

export default Homepage;
