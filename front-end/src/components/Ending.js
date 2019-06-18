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
      <div>
        <Scores score={this.props.score}/>
        <p></p>
        <button
          className="btn teal-bg text-light"
          onClick={event => this.props.gameRestart()}>
          Play Again
        </button>
      </div>
    )
  }
}
