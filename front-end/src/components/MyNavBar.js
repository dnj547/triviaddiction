import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

export default class MyNavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/"><img src="triviaddiction_logo.png" alt="triviaddiction logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {this.props.loggedIn ?
          <Nav className="mr-auto">
            <Link to="/play">New Game</Link>
            <Link to="/scores">High Scores</Link>
            <Link to="/account">My Account</Link>
          </Nav> : null}
      </Navbar>
    )
  }
}
