import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import GameContainer from './containers/GameContainer';
import HomePageContainer from './containers/HomePageContainer';
import MyNavBar from './components/MyNavBar'
import MyAccount from './components/MyAccount'
import ScoreBoardContainer from './containers/ScoreBoardContainer'

const API = 'http://localhost:3000/'
const CATEGORIES_API = 'https://opentdb.com/api_category.php'

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
      let categoriesWithManyQuestions = [9, 10, 11, 12, 14, 15, 16, 17, 18, 21, 22, 23, 27, 28, 31, 32]
      let filteredCategories = [...categories.trivia_categories].filter(category=>{
        return categoriesWithManyQuestions.includes(category.id)
      })
      this.setState({categories: filteredCategories})
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

            this.setState({
              loggedIn: true,
              currentUser: {
                id: data.id,
                username: data.username
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
    console.log('setting category');
    // console.log(e.currentTarget.id);
    let categorySelected = this.state.categories.filter(category=>{
      return category.id === parseInt(e.currentTarget.id, 10)
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
                scores: data.scores
              }
            })
          }
        })
      this.fetchCategories()
    } // end if
  } // end componentDidMount

  render() {
    console.log('App state', this.state);
    return (
      <Router>
        <div className="container">
          <MyNavBar
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
