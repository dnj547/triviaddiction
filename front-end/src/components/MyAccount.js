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
          <form onSubmit={this.props.doneEditingAccount}>
            <label>
              Username:
              <input
                type="text"
                onChange={this.props.handleChange}
                value={this.props.currentUser.username}
                name="username" />
            </label>
            <br/>
            <label>
              Password:
              <input
                type="password"
                onChange={this.props.handleChange}
                value={this.props.currentUser.password}
                name="password" />
            </label>
            <br/>
            <input type="submit" value="Submit" />
          </form>
          :
          <button onClick={this.props.editAccount}>
            Edit Account
          </button>
        }
      </div>
    )
  }
}
