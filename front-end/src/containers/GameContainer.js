import React from 'react';
import Questions from '../components/Questions'
import Scores from '../components/Scores'

const API = 'https://opentdb.com/api.php?amount=10'

export default class GameContainer extends React.Component {

  state = {
    questions: [],
    answeredQuestions: [],
    correctAnswers: [],
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

  // HELPER FUNCTIONS
  updateCorrectAnswers = (event) => {
    this.setState({
      correctAnswers: [...this.state.correctAnswers, event.target.id]
    }, () => console.log("updateCorrectAnswers state: ", this.state))
  }
  // end HELPER FUNCTIONS

  render() {
    console.log('GameContainer state', this.state);
    return (
      <div>
        <Scores correctAnswers={this.state.correctAnswers} />
        <Questions
          updateCorrectAnswers={this.updateCorrectAnswers}
          questions={this.state.questions}/>
      </div>
    )
  }
}
