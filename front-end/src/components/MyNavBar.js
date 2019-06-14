import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

export default class MyNavBar extends React.Component {
  render() {
    return (
      <Navbar bg="white" expand="sm">
        <Link to="/" className="mr-auto">
          <Navbar.Brand><img src="triviaddiction_logo.png" alt="triviaddiction logo" height="40px" /></Navbar.Brand>
        </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {this.props.loggedIn ?
          <Nav className="d-block">
            <Link to="/play" className="mr-4">
              <button className="btn text-white teal-bg border-0">New Game</button>
            </Link>
            <Link to="/scores" className="mr-4 text-dark">High Scores</Link>
            <Link to="/account" className="mr-2 text-dark">My Account</Link>
          </Nav> : null}
      </Navbar>
    )
  }
}
