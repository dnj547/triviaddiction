import React from 'react';
import Questions from '../components/Questions'


// Countdown
import Countdown from 'react-countdown-now'
const renderer = ({ hours, minutes, seconds, completed }) => {
  return <span>{seconds}</span>;
};
// end Countdown


export default class GameContainer extends React.Component {

  componentDidMount() {
    console.log('GameContainer componentDidMount');
  }

  render() {
    console.log('GameContainer props', this.props);
    console.log('');
    return (
      <div>
        {this.props.gameStarted ?
          <div>
            <Countdown
              renderer={renderer}
              onComplete={() => this.props.gameTimeOver()}
              date={Date.now() + 5000} />
            <Questions gameStarted={this.props.gameStarted}
              gameOver={this.props.gameOver}
              gameTimeOver={this.props.gameTimeOver}
              gameStart={this.props.gameStart}
              playAgainApp={this.props.playAgainApp}/>
          </div>
        :
          <div>
            <p>Hi {this.props.currentUser.username}</p>
            <button onClick={() => this.props.gameStart()}>Start Game</button>
          </div>
        }
      </div>
    )
  }
}
