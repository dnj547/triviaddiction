import React from 'react';
import Questions from '../components/Questions'

const API = 'https://opentdb.com/api.php?amount=10'

export default class GameContainer extends React.Component {

  state = {
    questions: [],
    answeredQuestions: [],
    currentQuestion: {}
  }

  componentDidMount() {
    console.log('component did mount');
    fetch(API)
    .then(r=>r.json())
    .then(questions=>{
      this.setState({questions: questions.results})
    })
  }

  render() {
    console.log('GameContainer state', this.state);
    return (
      <div>
        <Questions questions={this.state.questions}/>
      </div>
    )
  }
}
