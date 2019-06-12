import React from 'react';
import GameContainer from './containers/GameContainer'

// Countdown
import Countdown from 'react-countdown-now'
const renderer = ({ hours, minutes, seconds, completed }) => {
  return <span>{seconds}</span>;
};
// end Countdown

class App extends React.Component {
  state = {
    gameStarted: true,
    gameOver: false
  }

  // HELPER FUNCTIONS
  gameTimeOver = () => {
    this.setState({ gameOver: true})
  }
  // end HELPER FUNCTIONS

  render() {
    return (
      <div className="App">
      <Countdown
        renderer={renderer}
        onComplete={() => this.gameTimeOver()}
        date={Date.now() + 5000} />

      {
        this.state.gameOver ? "Game Over" :
      <GameContainer />
      }
      </div>
    );
  }
}

export default App;
