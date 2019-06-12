import React from 'react';
import Ending from './components/Ending'
import GameContainer from './containers/GameContainer'
import HomePageContainer from './containers/HomePageContainer'

// Countdown
import Countdown from 'react-countdown-now'
const renderer = ({ hours, minutes, seconds, completed }) => {
  return <span>{seconds}</span>;
};
// end Countdown

class App extends React.Component {
  state = {
    loggedIn: false,
    gameStarted: false,
    gameOver: false
  }

  // HELPER FUNCTIONS
  gameTimeOver = () => {
    console.log('game is over');
    this.setState({ gameOver: true})
  }

  logIn = () => {
    console.log('logging in');
    this.setState({ loggedIn: true })
  }

  gameStart = () => {
    console.log('game is starting');
    this.setState({gameStarted: true})
  }
  // end HELPER FUNCTIONS

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?
          <div>
            <GameContainer gameStarted={this.state.gameStarted}
            gameOver={this.state.gameOver}
            gameTimeOver={this.gameTimeOver}
            gameStart={this.gameStart}/>
          </div> :
          <HomePageContainer logIn={this.logIn}/>
        }
      </div>
    );
  }
}

export default App;
