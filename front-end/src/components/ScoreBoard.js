import React from "react"

const ScoreApi = 'http://localhost:3000/api/v1/users'
export default class ScoreBoard extends React.Component {
  state = {
    scores: []
  }
  componentDidMount() {
    fetch(ScoreApi)
      .then(r => r.json())
      .then(scores => {
        this.setState({ scores })
        // debugger
      })
  }
  render() {
    console.log("ScoreBoard", this.state)
    return (
      <div>
        ScoreBoard


      </div>
    )
  }
}
