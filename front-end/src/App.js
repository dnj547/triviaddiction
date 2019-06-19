import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import GameContainer from './containers/GameContainer';
import HomePageContainer from './containers/HomePageContainer';
import MyNavBar from './components/MyNavBar'
import MyAccount from './components/MyAccount'
import ScoreBoardContainer from './containers/ScoreBoardContainer'

const API = 'http://localhost:3000/'
const CATEGORIES_API = 'http://localhost:3000/api/v1/categories'
// const CATEGORIES_API = 'https://opentdb.com/api_category.php'

class App extends React.Component {
  state = {
    loggedIn: false,
    gameStarted: false,
    gameOver: false,
    playClicked: false,
    currentUser: {
      id: '',
      username: '',
      scores: [],
      highScore: ''
    },
    userForm: {
      username: '',
      password: ''
    },
    editingAccount: false,
    time: 60,
    timeSet: false,
    categories: [],
    categorySelected: {},
    errorMessage: ''
  }

  // HELPER FUNCTIONS
  fetchCategories = () => {
    console.log('fetching categories');
    fetch(CATEGORIES_API)
    .then(r=>r.json())
    .then(categories=>{
      this.setState({ categories })
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
    console.log('Logging in or signing up');
    if (this.state.userForm.username === '') {
      this.setState({ errorMessage: 'Username cannot be blank' })
    } else {
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

            // if scores exist, user is logging in
            if (data.scores) {
              this.setState({
                loggedIn: true,
                currentUser: {
                  id: data.id,
                  username: data.username,
                  scores: data.scores,
                  highScore: data.high_score
                }
              }) // end setState
            } // end if

            // else user is signing up
            this.setState({
              loggedIn: true,
              errorMessage: '',
              currentUser: {
                ...this.state.currentUser,
                id: data.id,
                username: data.username,
              }
            })
          } else {
            // render errors on page
            this.setState({
              errorMessage: data.error
            })
          } // end if
        })
      // end fetch
    } // end if
  } // end logIn

  playGame = () => {
    console.log('playing game');
    this.setState({
      playClicked: true,
      gameStarted: false
    })
  }

  gameStart = () => {
    console.log('game is starting');
    this.setState({gameStarted: true})
  }

  gameRestart = () => {
    console.log('game is starting');
    this.setState({gameStarted: false, gameOver: false})
  }

  playAgainApp = (id, score) => {
    console.log('playing game again');
    fetch(API + 'api/v1/scores', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: id,
        score: parseInt(score)
      })
    })
      .then(r => r.json())
      .then(data => {
        const newScoreObj = {
          score: data.score,
          created_at: data.created_at
        }

        this.setState({
          currentUser: {
            ...this.state.currentUser,
            scores: [newScoreObj, ...this.state.currentUser.scores]
          }
        })

        if (this.state.currentUser.highScore === '') {
          this.setState({
            currentUser: {
              ...this.state.currentUser,
              highScore: data.score
            }
          })
        }
      })
  }

  signOut = () => {
    console.log('signing out');
    this.setState({
      loggedIn: false,
      currentUser: {
        id: '',
        username: '',
        scores: [],
        highScore: ''
      }
    })
    localStorage.clear()
  }

  editAccount = () => {
    console.log('editing account');
    this.setState({editingAccount: !this.state.editingAccount})
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
  } // end doneEditingAccount

  deleteAccount = (event) => {
    console.log('deleting account', event.currentTarget.id);
    event.preventDefault()

    fetch(API + 'delete', {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    this.setState({ loggedIn: false, currentUser: null })
    localStorage.clear()
    window.location.href = "/"
  }

  setTime = (e) => {
    console.log('setting time');
    console.log(e.currentTarget.id);
    this.setState({time: e.currentTarget.id})
    this.setState({timeSet: true})
  }

  setCategory = (e) => {
    // debugger
    console.log('setting category');
    // console.log(e.currentTarget.id);
    let categorySelected = this.state.categories.filter(category=>{
      return category.api_id === parseInt(e.currentTarget.id, 10)
    })
    this.setState({categorySelected: categorySelected[0]})
    this.setState({categorySet: true})
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
                id: data.id,
                username: data.username,
                scores: data.scores,
                highScore: data.high_score
              }
            })
          }
        })
    } // end if
    this.fetchCategories()
  } // end componentDidMount

  render() {
    console.log('App state', this.state);
    return (
      <Router>
        <div className="container">
          <MyNavBar
            gameRestart={this.gameRestart}
            loggedIn={this.state.loggedIn}
            playGame={this.playGame}/>
          <div className="mt-4 text-center">
            <Route exact path='/' render={() => <HomePageContainer
              currentUser={this.state.currentUser}
              handleForm={this.handleForm}
              logIn={this.logIn}
              errorMessage={this.state.errorMessage}
              userForm={this.state.userForm}
              playGame={this.playGame}
              loggedIn={this.state.loggedIn}/>} />
            <Route exact path='/play' render={() => <GameContainer
              gameRestart={this.gameRestart}
              currentUser={this.state.currentUser}
              gameStarted={this.state.gameStarted}
              gameOver={this.state.gameOver}
              gameTimeOver={this.gameTimeOver}
              gameStart={this.gameStart}
              playAgainApp={this.playAgainApp}
              setTime={this.setTime}
              time={this.state.time}
              timeSet={this.state.timeSet}
              categories={this.state.categories}
              setCategory={this.setCategory}
              categorySelected={this.state.categorySelected}
              categorySet={this.state.categorySet} />}/>
            <Route exact path='/scores' render={() => <ScoreBoardContainer />} />
            <Route exact path='/account' render={() => <MyAccount
                loggedIn={this.state.loggedIn}
                handleForm={this.handleForm}
                userForm={this.state.userForm}
                currentUser={this.state.currentUser}
                signOut={this.signOut}
                editAccount={this.editAccount}
                editingAccount={this.state.editingAccount}
                doneEditingAccount={this.doneEditingAccount}
                deleteAccount={this.deleteAccount} />} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
