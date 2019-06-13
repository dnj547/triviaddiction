import React from 'react';
import GameContainer from './containers/GameContainer'
import HomePageContainer from './containers/HomePageContainer'

const API = 'http://localhost:3000/'

class App extends React.Component {
  state = {
    loggedIn: false,
    gameStarted: false,
    gameOver: false,
    playClicked: false,
    currentUser: '',
    user: {
      username: '',
      password: '',
      scores: []
    }
  }

  // HELPER FUNCTIONS
  handleLogin = (event) => {
    this.setState({
      user: {
        ...this.state.user,
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
        username: this.state.user.username,
        password: this.state.user.password
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
            if (data.username === this.state.user.username) {
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
    console.log('playAgainApp');
    this.setState({gameStarted: false, gameOver: false})
  }
  //
  // navBar = () => {
  //   return (
  //     <Navbar bg="light" variant="light">
  //       <Navbar.Brand href="#home">Navbar</Navbar.Brand>
  //       <Nav className="mr-auto">
  //         <Nav.Link href="#home">Home</Nav.Link>
  //         <Nav.Link href="#features">Features</Nav.Link>
  //         <Nav.Link href="#pricing">Pricing</Nav.Link>
  //       </Nav>
  //       <Form inline>
  //         <FormControl type="text" placeholder="Search" className="mr-sm-2" />
  //         <Button variant="outline-primary">Search</Button>
  //       </Form>
  //     </Navbar>
  //   )
  // }

  // end HELPER FUNCTIONS

  componentDidMount() {
    // check if current user is already logged in
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
              currentUser: data.username
            })
          }
        })
    }
  }

  render() {
    return (
      <div className="App">
        NavBar
        {this.state.playClicked ?
          <div>
            <GameContainer
              gameStarted={this.state.gameStarted}
              gameOver={this.state.gameOver}
              gameTimeOver={this.gameTimeOver}
              gameStart={this.gameStart}
              playAgainApp={this.playAgainApp}/>
          </div> :
          <HomePageContainer
            currentUser={this.state.currentUser}
            handleLogin={this.handleLogin}
            logIn={this.logIn}
            user={this.state.user}
            playGame={this.playGame}
            loggedIn={this.state.loggedIn}/>
        }
      </div>
    );
  }
}

export default App;
