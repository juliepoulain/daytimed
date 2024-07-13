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
  countdownKey,
  setCountdownKey,
  totalTimer,
}) => {
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [taskTimeLeft, setTaskTimeLeft] = useState(timerOffset * 1000);
  const [totalTimeLeft, setTotalTimeLeft] = useState(totalTimer * 1000);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ""}${
      hours > 0 && minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    if (taskRoutines.length > 0 && index < taskRoutines.length) {
      setCurrentTask(taskRoutines[index].tasktemplates.task_name);
      setTimerOffset(taskRoutines[index].tasktemplates.timer_length);
      setTaskTimeLeft(taskRoutines[index].tasktemplates.timer_length);
    }
  }, [index, taskRoutines, setCurrentTask, setTimerOffset]);

  const handleNext = () => {
    if (index + 1 < taskRoutines.length) {
      setIndex((prevIndex) => prevIndex + 1);
      setCountdownKey((prevKey) => prevKey + 1);
      setTaskTimeLeft(
        taskRoutines[index + 1].tasktemplates.timer_length * 1000
      );
    }
  };

  const handlePauseResume = () => {
    setPause(!pause);
  };

  const handlePrev = () => {
    if (index - 1 != -1) {
      setIndex((prevIndex) => prevIndex - 1);
      setCountdownKey((prevKey) => prevKey + 1);
      setTaskTimeLeft(
        taskRoutines[index - 1].tasktemplates.timer_length * 1000
      );
    }
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div>
          <h3>Task: "{currentTask}" is now complete!</h3>
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

  const renderer2 = ({ hours, minutes, seconds, completed, paused }) => {
    if (completed) {
      return <div>Routine Complete!</div>;
    } else if (paused) {
      return <div>paused</div>
    } else {
      return (
        <div>
          <h3>
            {hours}:{minutes}:{seconds}
          </h3>
        </div>
      );
    }
  };

  console.log(index);

  function handleCancel(e) {
    e.preventDefault();
    setCancelButton(false);
    setTimerRun(false);
    setIndex(0);
    setCurrentTask(taskRoutines[0].tasktemplates.task_name);
    setTimerOffset(taskRoutines[0].tasktemplates.timer_length);
    setTaskTimeLeft(taskRoutines[0].tasktemplates.timer_length);
    setTotalTimeLeft(totalTimer * 1000);
  }

  console.log(index);
  return (
    <div>
      {timerRun ? (
        <h1>
          <Countdown
            key={countdownKey}
            date={Date.now() + (pause ? timerOffset*1000 : timerOffset*1000 - 1000)}
            renderer={renderer}
          />
        </h1>
      ) : (
        <></>
      )}
      {timerRun ? (
        <button class="button-normal" onClick={handlePrev}>
          PREV
        </button>
      ) : (
        <></>
      )}
      {timerRun ? (
        <button className="button-normal" onClick={handlePauseResume}>
          {pause ? "RESUME" : "PAUSE"}
        </button>
      ) : (
        <></>
      )}
      {timerRun ? (
        <button class="button-normal" onClick={handleNext}>
          NEXT
        </button>
      ) : (
        <></>
      )}
      <br />
      {cancelButton ? (
        <button
          type="submit"
          className="button-normal"
          onClick={(e) => handleCancel(e)}
        >
          CANCEL ROUTINE
        </button>
      ) : (
        <></>
      )}
      {timerRun ? (
        <div>
          <h3>
            Total Routine Time Left:
            <Countdown
              key={countdownKey + 1}
              date={Date.now() + (pause ? totalTimer*1000 : totalTimer*1000 - 1000)}
              renderer={renderer2}
            />
          </h3>
          <h3>COMPLETE BY: </h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CountdownTimer;
