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
      </div>
    )
  }
}
