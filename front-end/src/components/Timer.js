import React from "react"
import Countdown from 'react-countdown-now'

const renderer = ({ hours, minutes, seconds, completed }) => {
  return <span>{seconds}</span>;
};

export default class Timer extends React.Component {
  render() {
    return (
      <div>
        Hello from Timer
        <Countdown
          renderer={renderer}
          onComplete={() => console.log("timer done")}
          date={Date.now() + 5000} />
      </div>
    )
  }
}
