import React from "react"

import ScoreBoard from "../components/ScoreBoard"

const ScoreApi = 'http://localhost:3000/api/v1/scores'

export default class ScoreBoardContainer extends React.Component {
  state = {
    scores: []
  }

  componentDidMount() {
    fetch(ScoreApi)
      .then(r => r.json())
      .then(scores => {
        this.setState({ scores })
      })
  }

  render() {
    console.log("ScoreBoardContainer", this.state)
    return (
      <table className="mx-auto table table-hover table-borderless">
        <thead>
          <tr className="pink-bg">
            <th><h5 className="mb-0">Rank</h5></th>
            <th><h5 className="mb-0">Username</h5></th>
            <th><h5 className="mb-0">Score</h5></th>
          </tr>
        </thead>
        <tbody>
          <ScoreBoard scores={this.state.scores} />
        </tbody>
      </table>
    )
  }
}

// {this.state.scores.length > 0 ? this.showScores() : "No scores yet, be the first to play!"}
