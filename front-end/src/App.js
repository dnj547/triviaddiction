import React from 'react';
import GameContainer from './containers/GameContainer'
import HomePageContainer from './containers/HomePageContainer'

const API = 'http://localhost:3000/'

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
        username: 'edgar',
        password: 'hello'
      })
    })
      .then(r => r.json())
      .then(data => {
        localStorage.setItem('token', data.token)
        this.setState({ loggedIn: true })
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
      this.setState({
        loggedIn: true
      })
    }
  }

  render() {
    return (
      <div className="App">
        NavBar
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
