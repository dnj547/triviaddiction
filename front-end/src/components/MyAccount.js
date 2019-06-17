import React from "react";
import {Link} from 'react-router-dom';

const moment = require('moment');

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
        <div className="row">

          <div className="col-sm-4">
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

          <div className="col-sm-8">
            <table className="mx-auto table table-hover table-borderless">
              <thead>
                <tr className="pink-bg">
                  <th><h5 className="mb-0">Last Played</h5></th>
                  <th><h5 className="mb-0">Score</h5></th>
                </tr>
              </thead>
              <tbody>
                {this.props.currentUser.scores.map((score, index) => {
                  return <tr key={index}>
                    <td>{moment(score.created_at).fromNow()}</td>
                    <td>{score.score}</td>
                  </tr>
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
    )
  }
}
