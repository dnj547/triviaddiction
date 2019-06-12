import React from 'react';

export default class HomePageContainer extends React.Component {
  render() {
    console.log('HomePageContainer props', this.props);
    return (
      <div>
        <h1>Triviaddiction</h1>
        <h2>Rules:</h2>
        <p>Answer as many questions as you can before the timer runs out!</p>
        <button onClick={this.props.logIn}>Play</button>
      </div>
    )
  }
}
