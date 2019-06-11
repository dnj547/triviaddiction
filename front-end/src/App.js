import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameContainer from './containers/GameContainer'

class App extends React.Component {

  render() {
    return (
      <div className="App">
      <GameContainer />
      </div>
    );
  }
}

export default App;
