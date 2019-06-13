import React from "react"

export default class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.logIn}>
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
        <input type="submit" value="Log In" />
      </form>
    )
  }
}
