import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class MyNavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"><img src="triviaddiction_logo.png" alt="triviaddiction logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {this.props.loggedIn ?
          <Nav className="mr-auto">
            <Nav.Link href="/signOut">Sign Out</Nav.Link>
            <Nav.Link href="/myAccount">My Account</Nav.Link>
          </Nav> : null}
      </Navbar>
    )
  }
}
