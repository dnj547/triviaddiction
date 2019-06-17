import React from "react"

export default class ScoreBoard extends React.Component {
  showScores = () => {
    // fetch(ScoreApi)
    //   .then(r => r.json())
    //   .then(scores => {
    //     this.setState({ scores })
    //   })
    return (
      this.props.scores.splice(0,10).map((score, index) => {
        return (
          <tr key={score.id}>
            <th>{index + 1}</th>
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
