import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({
  timerRun,
  setTimerRun,
  setCancelButton,
  cancelButton,
  taskRoutines
}) => {
    
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <h4>Time's Up!</h4>;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  function handleCancel(e) {
    e.preventDefault();
    setCancelButton(false);
    setTimerRun(false);
  }

  return (
    <div>
      <h1>Current Task Name</h1>
      {timerRun ? (
        <h1>
          <Countdown date={Date.now() + 10000} renderer={renderer} />
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
