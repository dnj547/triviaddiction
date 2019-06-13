import React from 'react';
import GameContainer from './containers/GameContainer';
import HomePageContainer from './containers/HomePageContainer';
import MyNavBar from './components/MyNavBar'

class App extends React.Component {
  state = {
    loggedIn: false,
    gameStarted: false,
    gameOver: false,
    playClicked: false
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

  playGame = () => {
    console.log('playing game');
    this.setState({playClicked: true})
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
        <MyNavBar loggedIn={this.state.loggedIn} />
        {this.state.playClicked ?
          <div>
            <GameContainer gameStarted={this.state.gameStarted}
            gameOver={this.state.gameOver}
            gameTimeOver={this.gameTimeOver}
            gameStart={this.gameStart}
            playAgainApp={this.playAgainApp}/>
          </div> :
          <HomePageContainer logIn={this.logIn} playGame={this.playGame} loggedIn={this.state.loggedIn}/>
        }
      </div>
    );
  }
}

export default App;
