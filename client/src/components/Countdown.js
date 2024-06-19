import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = () => {
  // Completion message when timer finishes
  const Completionist = () => <span>Time's up!</span>;

  // Renderer callback to customize the output
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completion message
      return <Completionist />;
    } else {
      // Render the countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div>
      <h1>Current Task Name</h1>
      <h1>
        <Countdown date={Date.now() + 5000} renderer={renderer} />
      </h1>
      <button className="button-normal">PAUSE TIMER</button>
    </div>
  );
};

export default CountdownTimer;
