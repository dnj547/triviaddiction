import React from 'react';
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


export default class Question extends React.Component {
  render() {
    // new array to house all answers
    const answers = [...this.props.question.incorrect_answers, this.props.question.correct_answer]
    const shuffleAnswers = [...answers].sort(() => Math.random() - 0.5)
    // shuffle answers so correct answer is not always the last one

    console.log('Question component props', this.props);
    console.log("shuffleAnswers", shuffleAnswers)
    console.log("answers", answers)
    return (
      <div>
        <h2>{entities.decode(this.props.question.question)}</h2>
        <p>{answers}</p>
      </div>
    )
  }
}
