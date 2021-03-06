import React from 'react';
import Question from './Question'
import Scores from '../components/Scores'
import Ending from '../components/Ending'

// const API = 'https://opentdb.com/api.php?amount=50'
// const API_WITH_CATEGORY = 'https://opentdb.com/api.php?amount=50&category=' //add CATEGORY_ID
const API_WITH_CATEGORY = 'http://localhost:3000/api/v1/categories/' //add CATEGORY_ID

export default class Questions extends React.Component {

  state = {
    questions: [],
    answeredQuestions: [],
    correctAnswers: []
  }

  componentDidMount() {
    console.log('Questions mounted');
    this.fetchQuestions()
  }

  // HELPER FUNCTIONS
  fetchQuestions = () => {
    console.log('fetching questions');
    fetch(API_WITH_CATEGORY + `${this.props.categorySelected.api_id}`)
    .then(r=>r.json())
    .then(questions=>{
      // debugger
      this.setState({questions: questions.questions, answeredQuestion: [], correctAnswers: []})
    })
  } // end fetchQuestions

  allQuestions = () => {
    return this.state.questions.slice(0,1).map(question => {
      return (
        <Question
          key={question.question}
          question={question}
          removeQuestionAnswered={this.removeQuestionAnswered}
          updateCorrectAnswers={this.updateCorrectAnswers} />
      )
    })
  }

  removeQuestionAnswered = (e) => {
    let newQuestions = this.state.questions.filter(question=>{
      return question.question !== e.target.dataset.question
    })

    if (this.state.questions.length <=1) {
      this.fetchQuestions()
    } else {
      this.setState({questions: newQuestions})
    }
  } // end removeQuestionAnswered

  updateCorrectAnswers = (event) => {
    this.setState({
      correctAnswers: [...this.state.correctAnswers, event.target.id]
    })
  } // end updateCorrectAnswers
  // end HELPER FUNCTIONS

  render() {
    console.log('Questions props', this.props);
    console.log('Questions state', this.state);
    return (
      <div>
        {this.props.gameOver ?
          <Ending
            gameRestart={this.props.gameRestart}
            currentUser={this.props.currentUser}
            score={this.state.correctAnswers.length}
            playAgainApp={this.props.playAgainApp}
             /> :
          <div>
            <Scores score={this.state.correctAnswers.length} />
            {this.allQuestions()}
          </div>
        }
      </div>
    )
  }
}
