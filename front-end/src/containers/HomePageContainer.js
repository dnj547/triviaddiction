import React from 'react';
import Form from '../components/Form'
import ScoreBoard from '../components/ScoreBoard'

export default class HomePageContainer extends React.Component {

  componentDidMount() {
    console.log('HomePageContainer componentDidMount');
  }

  render() {
    // console.log('HomePageContainer props', this.props);
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
            signUpLogIn={this.props.signUpLogIn}
            signUp={this.props.signUp}
            logIn={this.props.logIn}
            handleForm={this.props.handleForm}
            userForm={this.props.userForm} />
        }

        <ScoreBoard currentUser={this.props.currentUser} />
      </div>
    )
  }
}
