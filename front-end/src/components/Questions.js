import React from 'react';
// import Question from './Question'
// import Scores from '../components/Scores'
// import Ending from '../components/Ending'

const API_WITH_CATEGORY = 'https://opentdb.com/api.php?amount=50&category=' //add CATEGORY_ID

export default class Questions extends React.Component {
  //
  // state = {
  //   questions: [],
  //   answeredQuestions: [],
  //   correctAnswers: []
  // }

  componentDidMount() {
    console.log('Questions mounted');
    // this.fetchQuestions()
  }

  // HELPER FUNCTIONS
  // fetchQuestions = () => {
  //   console.log('fetching questions');
  //   fetch(API_WITH_CATEGORY + `${this.props.category.id}`)
  //   .then(r=>r.json())
  //   .then(questions=>{
  //     this.setState({questions: questions.results, answeredQuestion: [], correctAnswers: []})
  //   })
  // } // end fetchQuestions

  // allQuestions = () => {
  //   return this.state.questions.slice(0,1).map(question => {
  //     return (
  //       <Question
  //         key={question.question}
  //         question={question}
  //         removeQuestionAnswered={this.removeQuestionAnswered}
  //         updateCorrectAnswers={this.updateCorrectAnswers} />
  //     )
  //   })
  // }

  // removeQuestionAnswered = (e) => {
  //   let newQuestions = this.state.questions.filter(question=>{
  //     return question.question !== e.target.dataset.question
  //   })
  //
  //   if (this.state.questions.length <=1) {
  //     this.fetchQuestions()
  //   } else {
  //     this.setState({questions: newQuestions})
  //   }
  // } // end removeQuestionAnswered

  // updateCorrectAnswers = (event) => {
  //   this.setState({
  //     correctAnswers: [...this.state.correctAnswers, event.target.id]
  //   })
  // } // end updateCorrectAnswers
  // end HELPER FUNCTIONS

  render() {
    console.log('Questions props', this.props);
    console.log('Questions state', this.state);
    return (

    )
  }
}
