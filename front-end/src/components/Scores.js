import React from "react"

export default class Scores extends React.Component {
  render() {
    return (
      <div>
        <b>Current Score:</b>
        {this.props.correctAnswers}
      </div>
    )
  }
}
