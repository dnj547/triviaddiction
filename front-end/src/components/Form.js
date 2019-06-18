import React from "react"

export default class Form extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.errorMessage ? <div className="alert alert-danger mx-auto" role="alert">{this.props.errorMessage}</div> : null}
        <form className="form-inline bg-light p-4 rounded-lg">
          <div className="form-group">
            <input
              className="form-control mx-sm-3"
              type="text"
              placeholder="username"
              onChange={this.props.handleForm}
              value={this.props.userForm.username}
              name="username" />
          </div>
          <div className="form-group">
            <input
              className="form-control mx-sm-3"
              type="password"
              placeholder="password"
              onChange={this.props.handleForm}
              value={this.props.userForm.password}
              name="password" />
          </div>
          <div className="form-group">
            <input
              className="btn teal-bg text-white bold-it mr-2"
              onClick={this.props.logIn}
              type="submit"
              data-type="signup"
              value="Sign Up" />

            <input
              className="btn pink-bg text-white bold-it ml-2"
              onClick={this.props.logIn}
              type="submit"
              data-type="login"
              value="Log In" />
          </div>
        </form>
      </React.Fragment>
    )
  }
}
