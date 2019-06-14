import React from "react"

export default class Scores extends React.Component {
  render() {
    return (
      <div className="text-center">
        <b>Current Score:</b> {this.props.score}
      </div>
    )
  }
}
