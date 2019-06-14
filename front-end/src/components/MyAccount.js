import React from "react"

export default class MyAccount extends React.Component {

  scoresLis = () => {
    if (this.props.currentUser.scores.length > 0) {
      return this.props.currentUser.scores.map(score=>{
        return <li>score</li>
      })
    }
  }

  render() {
    console.log('MyAccount props', this.props);
    return (
      <div>
        <h1>{this.props.currentUser.username.toUpperCase()}</h1>
        <ul>
          {this.scoresLis()}
        </ul>
      </div>
    )
  }
}
