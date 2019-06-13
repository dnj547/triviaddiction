import React from "react"

export default class Ending extends React.Component {
  render() {
    return (
      <div>
        Score: {this.props.score}
        <p></p>
        <button onClick={this.props.playAgain}>Play Again</button>
      </div>
    )
  }
}
