import React from "react";
import {Link} from 'react-router-dom';

export default class MyAccount extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      window.location.href = "/"
    }
  }

  render() {
    console.log('MyAccount props', this.props);
    return (
      <div>
        <h1>{this.props.currentUser.username.toUpperCase()}</h1>
        {this.props.currentUser.scores.map(score => <div>{score}</div>)}
        <Link to='/'>
          <button onClick={this.props.signOut}>
            Sign Out
          </button>
        </Link>
        {this.props.editingAccount ?
          <form onSubmit={event => this.props.doneEditingAccount(event)}>
            <label>
              Username:
              <input
                type="text"
                onChange={this.props.handleForm}
                placeholder={this.props.currentUser.username}
                value={this.props.userForm.username}
                name="username" />
            </label>
            <br/>
            <label>
              Password:
              <input
                type="password"
                onChange={this.props.handleForm}
                value={this.props.userForm.password}
                name="password" required />
            </label>
            <br/>
            <input type="submit" value="Submit" />
          </form>
          :
          <button onClick={this.props.editAccount}>
            Edit Account
          </button>
        }
        <br/>
        <button id={this.props.currentUser.id} onClick={event => {if (window.confirm('Are you sure you wish to delete your account?')) this.props.deleteAccount(event)}}>
          Delete Account
        </button>
      </div>
    )
  }
}
