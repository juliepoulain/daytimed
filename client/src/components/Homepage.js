import React, { useState, useEffect } from "react";
import Countdown from "./Countdown";

function Homepage({ phone }) {
  const [routines, setRoutines] = useState([]);
  const [taskRoutines, setTaskRoutines] = useState([]);
  const [cancelButton, setCancelButton] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState("");
  const [timerRun, setTimerRun] = useState(false);
  const [currentTask, setCurrentTask] = useState(null)
  const [timerOffset, setTimerOffset] = useState(null);
  const [countdownKey, setCountdownKey] = useState(0);
  const [totalTimer, setTotalTimer] = useState("")
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
    setSelectedRoutine(e.target.value);
    setCancelButton(false)
    setTimerRun(false)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCancelButton(true);
    setTimerRun(true);
    fetch(`/api/taskroutines/routine/${selectedRoutine}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((data) => {
        setTaskRoutines(data);
        setCurrentTask(data[0].tasktemplates.task_name)
        setTimerOffset(data[0].tasktemplates.timer_length)
        setCountdownKey((prevKey) => prevKey + 1)
        setTotalTimer(data[0].routinetemplates.total_timer_length)
      });
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
        {taskRoutines.length ? (
          <Countdown
            timerRun={timerRun}
            setTimerRun={setTimerRun}
            setCancelButton={setCancelButton}
            cancelButton={cancelButton}
            taskRoutines={taskRoutines}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            timerOffset={timerOffset}
            setTimerOffset={setTimerOffset}
            countdownKey={countdownKey}
            setCountdownKey={setCountdownKey}
            totalTimer={totalTimer}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Homepage;
