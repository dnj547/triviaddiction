import React from 'react';
import Question from './Question'
import Scores from '../components/Scores'
import Ending from '../components/Ending'

const API = 'https://opentdb.com/api.php?amount=10'


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

  fetchQuestions = () => {
    console.log('fetching questions');
    fetch(API)
    .then(r=>r.json())
    .then(questions=>{
      this.setState({questions: questions.results, answeredQuestion: [], correctAnswers: []})
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
    // console.log('removequestionanswered', e);
    let newQuestions = this.state.questions.filter(question=>{
      return question.question !== e.target.dataset.question
    })
    // console.log('new questions', newQuestions);

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

  // playAgainQuestions = () => {
  //   // console.log('playAgainQuestions');
  //   this.componentWillUnmount();
  // }
  //
  // componentWillUnmount() {
  //   console.log('Questions component will unmount');
  //   this.props.playAgainApp();
  // }

  render() {
    return (
      <div>
        {this.props.gameOver ?
          <Ending
            currentUser={this.props.currentUser}
            score={this.state.correctAnswers.length}
            playAgainApp={this.props.playAgainApp}
             /> :
          <div>
            <Scores correctAnswers={this.state.correctAnswers.length} />
            {this.allQuestions()}
          </div>
        }
      </div>
    )
  }
}
