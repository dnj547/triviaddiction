import React from 'react';
import Questions from '../components/Questions';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';



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
              <div>
                <div>
                  <button className="btn btn-primary" id="15" onClick={(e)=>this.props.setTime(e)}>15 Seconds</button>
                  <button className="btn btn-primary" id="30" onClick={(e)=>this.props.setTime(e)}>30 Seconds</button>
                  <button className="btn btn-primary" id="60" onClick={(e)=>this.props.setTime(e)}>60 Seconds</button>
                </div>
                <br/>
                <div>
                  <DropdownButton id="dropdown-basic-button" title="Category">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                </div>
                <br/>
                {this.props.timeSet && this.props.categorySet ?
                  <button className="btn btn-primary" onClick={() => this.props.gameStart()}>Start Game</button>
                  :
                  <button className="btn btn-primary" disabled>Start Game</button>

                }
              </div>

          </div>
        }
      </div>
    )
  }
}
