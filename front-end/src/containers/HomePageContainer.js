import React from 'react';

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
            <p>Hi {this.props.currentUser.username}</p>
            <button onClick={this.props.playGame}>Play</button>
          </div> :
          <form onSubmit={this.props.logIn}>
            <label>
              Username:
              <input
                type="text"
                onChange={this.props.handleLogin}
                value={this.props.userLogin.username}
                name="username" />
            </label>
            <br/>
            <label>
              Password:
              <input
                type="password"
                onChange={this.props.handleLogin}
                value={this.props.userLogin.password}
                name="password" />
            </label>
            <br/>
            <input type="submit" value="Log In" />
          </form>
        }
      </div>
    )
  }
}
