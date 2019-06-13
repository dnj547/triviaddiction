import React from 'react';
import GameContainer from './containers/GameContainer'
import HomePageContainer from './containers/HomePageContainer'

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

  playAgainApp = () => {
    console.log('playAgainApp');
    this.setState({gameStarted: false, gameOver: false})
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
            gameStart={this.gameStart}
            playAgainApp={this.playAgainApp}/>
          </div> :
          <HomePageContainer logIn={this.logIn}/>
        }
      </div>
    );
  }
}

export default App;
