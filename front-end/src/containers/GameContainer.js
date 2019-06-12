import React from 'react';
import Questions from '../components/Questions'
import Scores from '../components/Scores'
import Ending from '../components/Ending'

// Countdown
import Countdown from 'react-countdown-now'
const renderer = ({ hours, minutes, seconds, completed }) => {
  return <span>{seconds}</span>;
};
// end Countdown

const API = 'https://opentdb.com/api.php?amount=10'

export default class GameContainer extends React.Component {

  state = {
    questions: [],
    answeredQuestions: [],
    correctAnswers: [],
    currentQuestion: {},
    gameStarted: false,
    gameOver: false
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
  } // end fetchQuestions

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
  } // end removeQuestionAnswered

  updateCorrectAnswers = (event) => {
    this.setState({
      correctAnswers: [...this.state.correctAnswers, event.target.id]
    })
  } // end updateCorrectAnswers
  // end HELPER FUNCTIONS

  render() {
    console.log('GameContainer state', this.state);
    return (
      <div>
        <button onClick={() => this.setState({gameStarted: true})}>Start Game</button>

        <Scores correctAnswers={this.state.correctAnswers} />

        <Questions
          updateCorrectAnswers={this.updateCorrectAnswers}
          removeQuestionAnswered={this.removeQuestionAnswered}
          questions={this.state.questions}/>
      </div>
    )
  }
}
