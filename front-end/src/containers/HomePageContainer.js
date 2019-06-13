import React from 'react';
import Form from '../components/Form'

export default class HomePageContainer extends React.Component {
  render() {
    console.log('HomePageContainer props', this.props);
    return (
      <div>
        <h1>Triviaddiction</h1>
        <h2>Rules:</h2>
        <p>Answer as many questions as you can before the timer runs out!</p>
        {this.props.loggedIn ?
          <div>
            <button onClick={this.props.playGame}>Play</button>
          </div> :
          <Form
            logIn={this.props.logIn}
            handleForm={this.props.handleForm}
            userForm={this.props.userForm} />
        }
      </div>
    )
  }
}
