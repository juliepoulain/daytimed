import React from 'react';
import Countdown from 'react-countdown';

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
      <h2>Countdown Timer</h2>
      <Countdown date={Date.now() + 5000} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;