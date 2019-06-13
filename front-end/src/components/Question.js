import React from 'react';
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


export default class Question extends React.Component {
  state = {
    answered: false,
    answers: [],
    correct_answer: ''
  }

  selectAnswer = (event) => {
    // debugger
    // correct answer is here: this.props.question.correct_answer
    // console.log(event.target.id)

    // check if current answer is correct
    if (event.target.id === this.state.correct_answer) {
      // if true turn background green
      event.target.style.background = "green"

      this.props.updateCorrectAnswers(event)

    } else {
      // else background red
      event.target.style.background = "red"
    }
    // only one click
    this.setState({
      answered: true
    })
    // this.props.removeQuestionAnswered(event)
  }
  componentDidMount() {
    // new array to house all answers
    const answers = [...this.props.question.incorrect_answers, this.props.question.correct_answer]

    // decode answers in case they're regexed
    const decodedAnswers = answers.map(answer => entities.decode(answer))

    const shuffleAnswers = [...decodedAnswers].sort(() => Math.random() - 0.5)
    // shuffle answers so correct answer is not always the last one

    // decode correct answer
    const correct_answer = entities.decode(this.props.question.correct_answer)

    this.setState({
      answers: shuffleAnswers,
      correct_answer: correct_answer
    })

  }

  render() {

    // console.log('Question component props', this.props);
    // console.log("Question state: ", this.state)

    const displayShuffleAnswers = this.state.answers.map(answer => {
      return (
        <div
          id={answer}
          key={answer}
          data-question={this.props.question.question}>
          {answer}
        </div>
      )
    })

    return (
      <div>
        <h2>{entities.decode(this.props.question.question)}</h2>
        <div onClick={this.state.answered ? null : event => this.selectAnswer(event)}>
          {displayShuffleAnswers}
        </div>
        {this.state.answered ? <button onClick={(e)=>this.props.removeQuestionAnswered(e)} data-question={this.props.question.question}>Next Question</button> : null}
      </div>
    )
  }
}
