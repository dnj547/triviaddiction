import React from 'react';
import Questions from '../components/Questions'
import Scores from '../components/Scores'

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

  // HELPER FUNCTIONS
  updateAnsweredQuestions = (event) => {
    this.setState({
      answeredQuestions: [...this.state.answeredQuestions, event.target.id]
    }, () => console.log("updateAnsweredQuestions state: ", this.state))
  }
  // end HELPER FUNCTIONS

  render() {
    console.log('GameContainer state', this.state);
    return (
      <div>
        <Scores answeredQuestions={this.state.answeredQuestions} />
        <Questions
          updateAnsweredQuestions={this.updateAnsweredQuestions}
          questions={this.state.questions}/>
      </div>
    )
  }
}
