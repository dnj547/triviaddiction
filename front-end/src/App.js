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
    gameStarted: true,
    gameOver: false
  }

  // HELPER FUNCTIONS
  gameTimeOver = () => {
    this.setState({ gameOver: true})
  }

  logIn = () => {
    this.setState({ loggedIn: true })
  }
  // end HELPER FUNCTIONS

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?
          <div>
            <Countdown
            renderer={renderer}
            onComplete={() => this.gameTimeOver()}
            date={Date.now() + 5000} />
            <GameContainer gameStarted={this.state.gameStarted}
            gameOver={this.state.gameOver}/>
          </div> :
          <HomePageContainer logIn={this.logIn}/>
        }
      </div>
    );
  }
}

export default App;
