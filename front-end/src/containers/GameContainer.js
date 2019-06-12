import React from 'react';
import Questions from '../components/Questions'

const API = 'https://opentdb.com/api.php?amount=10'

export default class GameContainer extends React.Component {

  state = {
    questions: [],
    answeredQuestions: []
  }

  componentDidMount() {
    console.log('GameContainer mounted');
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
    this.setState({questions: newQuestions})
  }

  render() {
    console.log('GameContainer state', this.state);
    return (
      <div>
        <Questions questions={this.state.questions} removeQuestionAnswered={this.removeQuestionAnswered}/>
      </div>
    )
  }
}
