import React from "react"

const ScoreApi = 'http://localhost:3000/api/v1/scores'
export default class ScoreBoard extends React.Component {
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

  showScores = () => {
    fetch(ScoreApi)
      .then(r => r.json())
      .then(scores => {
        this.setState({ scores })
      })
    return (
      <table>
        <thead>
          <tr>
            <td>Username</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
          {this.state.scores.splice(0,9).map(score => {
            return (
              <tr key={score.id}>
                <td>{score.user.username}</td>
                <td>{score.score}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
  render() {
    console.log("ScoreBoard", this.state)
    return (
      <div>
        {this.state.scores.length > 0 ? this.showScores() : "No scores yet, be the first to play!"}
      </div>
    )
  }
}
