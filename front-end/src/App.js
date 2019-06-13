import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import GameContainer from './containers/GameContainer';
import HomePageContainer from './containers/HomePageContainer';
import MyNavBar from './components/MyNavBar'

const API = 'http://localhost:3000/'

class App extends React.Component {
  state = {
    loggedIn: false,
    gameStarted: false,
    gameOver: false,
    playClicked: false,
    currentUser: {
      id: '',
      username: '',
      scores: []
    },
    userLogin: {
      username: '',
      password: ''
    }
  }

  // HELPER FUNCTIONS
  handleLogin = (event) => {
    this.setState({
      userLogin: {
        ...this.state.userLogin,
        [event.target.name]: event.target.value
      }
    })
  }

  gameTimeOver = () => {
    console.log('game is over');
    this.setState({ gameOver: true})
  }

  logIn = (event) => {
    event.preventDefault()
    console.log('logging in');
    fetch(API + 'login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: this.state.userLogin.username,
        password: this.state.userLogin.password
      })
    })
      .then(r => r.json())
      .then(data => {
        if (!!data.token) {
          localStorage.setItem('token', data.token)
        }
      })
      .then(() => {
        fetch(API + 'profile', {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        })
          .then(r => r.json())
          .then(data => {
            if (data.username === this.state.userLogin.username) {
              this.setState({
                loggedIn: true,
              })
            }
          })
      })
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
    console.log('playing game again');
    this.setState({gameStarted: false, gameOver: false})
  }

  signOut = () => {
    console.log('signing out');
    this.setState({loggedIn: false})
    localStorage.clear()
  }

  // end HELPER FUNCTIONS

  componentDidMount() {
    // check if current user is already logged in
    console.log('App componentDidMount');
    if (!!localStorage.token) {
      fetch(API + 'profile', {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      })
        .then(r => r.json())
        .then(data => {
          // debugger
          if (!!data.username) {
            console.log("logged in")
            this.setState({
              loggedIn: true,
              currentUser: {
                ...this.state.currentUser,
                id: data.id,
                username: data.username
              }
            })
          }
        })
    }
  } // end of componentDidMount

  render() {
    // console.log('App state', this.state);
    return (

      <Router>
        <div className="app">
          <MyNavBar loggedIn={this.state.loggedIn} signOut={this.signOut} />
          <Route exact path="/" render={(routerProps)=>HomePageContainer} />

        </div>
      </Router>

    );
  }
}

export default App;


// <div className="App">
// <MyNavBar loggedIn={this.state.loggedIn} signOut={this.signOut} />
// {this.state.playClicked ?
//   <div>
//   <GameContainer
//   gameStarted={this.state.gameStarted}
//   gameOver={this.state.gameOver}
//   gameTimeOver={this.gameTimeOver}
//   gameStart={this.gameStart}
//   playAgainApp={this.playAgainApp}/>
//   </div> :
//   <HomePageContainer
//   currentUser={this.state.currentUser}
//   handleLogin={this.handleLogin}
//   logIn={this.logIn}
//   userLogin={this.state.userLogin}
//   playGame={this.playGame}
//   loggedIn={this.state.loggedIn}/>
// }
// </div>
