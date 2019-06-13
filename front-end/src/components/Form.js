import React from "react"

export default class Form extends React.Component {
  render() {
    return (
      <form
        data-type={this.props.signUp ? "signup" : "login" } 
        onSubmit={this.props.logIn}>
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
        <input type="submit" value={this.props.signUp ? "Sign Up" : "Log In"} />

        {
          this.props.signUp ?
            <div onClick={this.props.signUpLogIn} value="Log In">
              Log In
            </div>
        :

            <div onClick={this.props.signUpLogIn} value="Sign Up">
              Sign Up
            </div>
        }
      </form>
    )
  }
}
