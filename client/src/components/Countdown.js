import React, { useState, useEffect, useCallback } from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({
  timerRun,
  setTimerRun,
  setCancelButton,
  cancelButton,
  taskRoutines,
  currentTask,
  setCurrentTask,
  timerOffset,
  setTimerOffset,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (taskRoutines.length > 0 && index < taskRoutines.length) {
      setCurrentTask(taskRoutines[index].tasktemplates.task_name);
      setTimerOffset(taskRoutines[index].tasktemplates.timer_length);
    }
  }, [index, taskRoutines, setCurrentTask, setTimerOffset]);

  const handleCountdownComplete = useCallback(() => {
    if (index + 1 < taskRoutines.length) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      return <h3>TIMER COMPLETE!</h3>;
    }
  }, [index, taskRoutines.length, setTimerRun, setCancelButton]);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (hours < 1 && minutes < 1 && seconds == 1) {
      handleCountdownComplete();
      return (
        <div>
          <h3>
            {currentTask}
            <br />
            {hours}:{minutes}:{seconds}
          </h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3>
            {currentTask}
            <br />
            {hours}:{minutes}:{seconds}
          </h3>
        </div>
      );
    }
  };

  function handleCancel(e) {
    e.preventDefault();
    setCancelButton(false);
    setTimerRun(false);
    setIndex(0);
    setCurrentTask(taskRoutines[0].tasktemplates.task_name);
    setTimerOffset(taskRoutines[0].tasktemplates.timer_length);
  }
  console.log(index);
  return (
    <div>
      {timerRun ? (
        <h1>
          <Countdown
            date={Date.now() + timerOffset * 1000}
            renderer={renderer}
          />
        </h1>
      ) : (
        <></>
      )}
      {cancelButton ? (
        <button
          type="submit"
          className="button-normal"
          onClick={(e) => handleCancel(e)}
        >
          CANCEL
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CountdownTimer;
