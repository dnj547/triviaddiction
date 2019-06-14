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
      <div className="container">
        {this.props.gameStarted ?
          <div>
            <Countdown
              renderer={renderer}
              onComplete={() => this.props.gameTimeOver()}
              date={Date.now() + this.props.time*1000} />
            <Questions
              currentUser={this.props.currentUser}
              gameStarted={this.props.gameStarted}
              gameOver={this.props.gameOver}
              gameTimeOver={this.props.gameTimeOver}
              gameStart={this.props.gameStart}
              playAgainApp={this.props.playAgainApp}/>
          </div>
        :
          <div>
            <p>Hi {this.props.currentUser.username}</p>
            {this.props.timeSet ?
              <button className="btn btn-primary" onClick={() => this.props.gameStart()}>Start Game</button>
              :
              <div>
                <button className="btn btn-primary" id="15" onClick={(e)=>this.props.setTime(e)}>15 Seconds</button>
                <button className="btn btn-primary" id="30" onClick={(e)=>this.props.setTime(e)}>30 Seconds</button>
                <button className="btn btn-primary" id="60" onClick={(e)=>this.props.setTime(e)}>60 Seconds</button>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}
