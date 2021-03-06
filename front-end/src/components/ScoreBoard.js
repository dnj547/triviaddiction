import React from "react"

export default class ScoreBoard extends React.Component {
  showScores = () => {
    return (
      this.props.scores.slice(0,10).map((score, index) => {
        return (
          <tr key={score.id}>
            <td>{index + 1}</td>
            <td>{score.user.username}</td>
            <td>{score.score}</td>
          </tr>
        )
      })
    )
  }

  render() {
    console.log("ScoreBoard props", this.props)
    return (
      <React.Fragment>
        {this.showScores()}
      </React.Fragment>
    )
  }
}
