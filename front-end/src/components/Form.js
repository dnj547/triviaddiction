import React from "react"

export default class Form extends React.Component {
  render() {
    return (
      <form>
        <label>
          Username:
          <input
            type="text"
            onChange={this.props.handleForm}
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
            name="password" />
        </label>
        <br/>
        <input
          onClick={this.props.logIn}
          type="submit"
          data-type="signup"
          value="Sign Up" />
        <input
          onClick={this.props.logIn}
          type="submit"
          data-type="login"
          value="Log In" />
      </form>
    )
  }
}
