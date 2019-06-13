import React from "react"

export default class Ending extends React.Component {
  render() {
    console.log("ending", this.props.currentUser)
    return (
      <div>
        Score: {this.props.score}
        <p></p>
        <button
          data-user={this.props.currentUser.id}
          data-score={this.props.score}
          onClick={event => this.props.playAgainApp(event)}>
          Play Again
        </button>
      </div>
    )
  }
}
