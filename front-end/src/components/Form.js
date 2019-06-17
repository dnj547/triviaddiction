import React from "react"

export default class Form extends React.Component {
  render() {
    return (
      <form className="form-group">
        <label>
          Username
        </label>
        <input
          className="form-control col-sm-6 mx-auto"
          type="text"
          onChange={this.props.handleForm}
          value={this.props.userForm.username}
          name="username" />
        <br/>
        <label>
          Password
        </label>
          <input
            className="form-control col-sm-6 mx-auto"
            type="password"
            onChange={this.props.handleForm}
            value={this.props.userForm.password}
            name="password" />
        <br/>
        <input
          className="btn btn-primary mr-2"
          onClick={this.props.logIn}
          type="submit"
          data-type="signup"
          value="Sign Up" />

        <input
          className="btn btn-secondary ml-2"
          onClick={this.props.logIn}
          type="submit"
          data-type="login"
          value="Log In" />
      </form>
    )
  }
}
