import React from 'react';
import Questions from '../components/Questions'


// Countdown
import Countdown from 'react-countdown-now'
const renderer = ({ hours, minutes, seconds, completed }) => {
  return <span>{seconds}</span>;
};
// end Countdown


export default class GameContainer extends React.Component {

  // HELPER FUNCTIONS
  // end HELPER FUNCTIONS

  render() {
    console.log('GameContainer props', this.props);
    return (
      <div>
        {this.props.gameStarted ?
          <Countdown
          renderer={renderer}
          onComplete={() => this.props.gameTimeOver()}
          date={Date.now() + 5000} /> :
          <button onClick={() => this.props.gameStart()}>Start Game</button>
        }

          <div>
            <Questions gameStarted={this.props.gameStarted}
              gameOver={this.props.gameOver}
              gameTimeOver={this.props.gameTimeOver}
              gameStart={this.props.gameStart}/>
          </div>
      </div>
    )
  }
}
