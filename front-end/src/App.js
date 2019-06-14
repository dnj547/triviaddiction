import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import GameContainer from './containers/GameContainer';
import HomePageContainer from './containers/HomePageContainer';
import MyNavBar from './components/MyNavBar'
import MyAccount from './components/MyAccount'
import ScoreBoard from './components/ScoreBoard'

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
    userForm: {
      username: '',
      password: ''
    },
    signUp: true,
    editingAccount: false,
    time: 60,
    timeSet: false
  }

  // HELPER FUNCTIONS
  signUpLogIn = (event) => {
    event.preventDefault()
    this.setState({
      signUp: !this.state.signUp
    })
  }

  handleForm = (event) => {
    this.setState({
      userForm: {
        ...this.state.userForm,
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
    fetch(API + event.currentTarget.dataset.type, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: this.state.userForm.username,
        password: this.state.userForm.password
      })
    })
      .then(r => r.json())
      .then(data => {
        // checks if token is returned
        if (!!data.token) {
          localStorage.setItem('token', data.token)
        }
      })
      .then(() => {
        // secondary fetch to validate token
        fetch(API + 'profile', {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        })
          .then(r => r.json())
          .then(data => {
            if (data.username === this.state.userForm.username) {
              this.setState({
                loggedIn: true,
                currentUser: {
                  id: data.id,
                  username: data.username
                }
              })
            }
          })
      }) // end secondary fetch
  } // end logIn

  playGame = () => {
    console.log('playing game');
    this.setState({playClicked: true})
  }

  gameStart = () => {
    console.log('game is starting');
    this.setState({gameStarted: true})
  }

  playAgainApp = (event) => {
    console.log('playing game again');
    fetch(API + 'api/v1/scores', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: event.currentTarget.dataset.user,
        score: parseInt(event.currentTarget.dataset.score)
      })
    })
      .then(r => r.json())
      .then(() => {
        this.setState({
          gameStarted: false,
          gameOver: false
        })
      })
  }

  signOut = () => {
    console.log('signing out');
    this.setState({loggedIn: false})
    localStorage.clear()
  }

  editAccount = () => {
    console.log('editing account');
    this.setState({editingAccount: true})
  }

  doneEditingAccount = (event) => {
    console.log('done editing account', this.state);
    event.preventDefault()

    fetch(API + 'edit', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify({
        username: this.state.userForm.username,
        password: this.state.userForm.password
      })
    })
      .then(r => r.json())
      .then(data => {
        this.setState({
          editingAccount: false,
          currentUser: {
            ...this.state.currentUser,
            username: data.username
          }
        })
      })

  }

  deleteAccount = () => {
    console.log('deleting account');
  }

  setTime = (e) => {
    console.log('setting time');
    console.log(e.currentTarget.id);
    this.setState({time: e.currentTarget.id})
    this.setState({timeSet: true})
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
          // check if username is returned
          if (!!data.username) {
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
    } // end if
  } // end componentDidMount

  render() {
    // console.log('App state', this.state);
    return (
      <Router>
        <div className="container">
          <MyNavBar
            loggedIn={this.state.loggedIn}
            playGame={this.playGame}/>
          <Route exact path='/' render={() => <HomePageContainer
            currentUser={this.state.currentUser}
            signUpLogIn={this.signUpLogIn}
            signUp={this.state.signUp}
            handleForm={this.handleForm}
            logIn={this.logIn}
            userForm={this.state.userForm}
            playGame={this.playGame}
            loggedIn={this.state.loggedIn}/>} />
          <Route exact path='/play' render={() => <GameContainer
            currentUser={this.state.currentUser}
            gameStarted={this.state.gameStarted}
            gameOver={this.state.gameOver}
            gameTimeOver={this.gameTimeOver}
            gameStart={this.gameStart}
            playAgainApp={this.playAgainApp}
            setTime={this.setTime}
            time={this.state.time}
            timeSet={this.state.timeSet} />}/>
          <Route exact path='/scores' render={() => <ScoreBoard />} />
          <Route exact path='/account' render={() => <MyAccount
              handleForm={this.handleForm}
              userForm={this.state.userForm}
              currentUser={this.state.currentUser}
              signOut={this.signOut}
              editAccount={this.editAccount}
              editingAccount={this.state.editingAccount}
              doneEditingAccount={this.doneEditingAccount}
              deleteAccount={this.deleteAccount} />} />
        </div>
      </Router>
    );
  }
}

export default App;
