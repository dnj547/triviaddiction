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

          <div className="col-sm-8">
            <table className="mx-auto table table-hover table-borderless">
              <thead>
                <tr className="pink-bg-only">
                  <th><h5 className="mb-0">Last Played</h5></th>
                  <th><h5 className="mb-0">Score</h5></th>
                </tr>
              </thead>
              <tbody>
                {this.props.currentUser.scores.slice(0,10).map((score, index) => {
                  return <tr key={index}>
                    <td>{moment(score.created_at).fromNow()}</td>
                    <td>{score.score}</td>
                  </tr>
                  })
                }
              </tbody>
            </table>
          </div>

          <div className="col-sm-4">
            <h4 className="teal-bg-only p-2 mb-4">Highest Score</h4>
            <h4>{this.props.currentUser.highScore}</h4>
            <br /><br />

            <h4 className="teal-bg-only p-2 mb-4">User Settings</h4>
            {this.props.editingAccount ?
              <form
                className="form-group"
                onSubmit={event => this.props.doneEditingAccount(event)}>
                <h4>Update Account</h4>
                <label>
                  Username
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.props.handleForm}
                    placeholder={this.props.currentUser.username}
                    value={this.props.userForm.username}
                    name="username" />
                </label>
                <br/>
                <label>
                  Password
                  <input
                    className="form-control"
                    type="password"
                    onChange={this.props.handleForm}
                    value={this.props.userForm.password}
                    name="password" required />
                </label>
                <br/>
                <input
                  className="btn btn-primary bold-it"
                  type="submit" value="Update" />
                <br />
                <Link
                  className="btn-sm text-secondary"
                  to="#"
                  onClick={this.props.editAccount}>Cancel</Link>
              </form>
              :
              <button
                className="btn btn-primary bold-it"
                onClick={this.props.editAccount}>
                Update Account
              </button>
            }
            <br /><br />
            <Link to='/'>
              <button
                className="btn-sm btn-danger bold-it"
                onClick={this.props.signOut}>
                Log Out
              </button>
            </Link>
            <br /><br />
            <Link
              to="/"
              className="text-danger btn-sm"
              id={this.props.currentUser.id}
              onClick={event => {if (window.confirm('Are you sure you wish to delete your account?')) this.props.deleteAccount(event)}}>
              Delete Account
            </Link>
          </div>



        </div>
      </div>
    )
  }
}
