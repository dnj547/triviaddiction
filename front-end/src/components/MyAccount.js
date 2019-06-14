import React from "react";
import {Link} from 'react-router-dom';

export default class MyAccount extends React.Component {

  render() {
    console.log('MyAccount props', this.props);
    return (
      <div>
        <h1>{this.props.currentUser.username.toUpperCase()}</h1>
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
        <button onClick={() => {if (window.confirm('Are you sure you wish to delete your account?')) this.props.deleteAccount()}}>
          Delete Account
        </button>
      </div>
    )
  }
}
