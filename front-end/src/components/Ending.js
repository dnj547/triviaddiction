import React from "react"
import Scores from "./Scores"

export default class Ending extends React.Component {
  componentDidMount() {
    // passing (id, score) as argument
    this.props.playAgainApp(this.props.currentUser.id, this.props.score)
  }
  render() {
    console.log("ending", this.props.currentUser)
    return (
      <div className="m-4 p-4 shadow question-rounded">
        <h2 style={{color: '#FBA9A7'}} className="mt-4 pt-4">Your Score:</h2>
        <h2>
          {this.props.score}
        </h2>
        <div className="m-4">
          <button
            className="btn-lg border-0 teal-bg text-light"
            onClick={event => this.props.gameRestart()}>
            Play Again
          </button>
        </div>
      </div>
    )
  }
}
