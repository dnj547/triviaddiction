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
    console.log('GameContainer mounted');
    this.fetchQuestions()
  }

  // HELPER FUNCTIONS

  fetchQuestions = () => {
    console.log('fetching questions');
    fetch(API)
    .then(r=>r.json())
    .then(questions=>{
      this.setState({questions: questions.results})
    })
  }

   removeQuestionAnswered = (e) => {
    console.log('removequestionanswered', e);
    let newQuestions = this.state.questions.filter(question=>{
      return question.question !== e.target.dataset.question
    })
    console.log('new questions', newQuestions);

    if (this.state.questions.length <=1) {
      this.fetchQuestions()
    } else {
      this.setState({questions: newQuestions})
    }

  }

  updateCorrectAnswers = (event) => {
    this.setState({
      correctAnswers: [...this.state.correctAnswers, event.target.id]
    })
  }
  // end HELPER FUNCTIONS

  render() {
    console.log('GameContainer state', this.state);
    return (
      <div>
        <Scores correctAnswers={this.state.correctAnswers} />
        <Questions
          updateCorrectAnswers={this.updateCorrectAnswers}
          removeQuestionAnswered={this.removeQuestionAnswered}
          questions={this.state.questions}/>
      </div>
    )
  }
}
