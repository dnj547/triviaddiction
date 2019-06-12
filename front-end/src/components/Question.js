import React from 'react';
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


export default class Question extends React.Component {

  render() {
    // new array to house all answers
    const answers = [...this.props.question.incorrect_answers, this.props.question.correct_answer]

    // decode answers in case they're regexed
    const decodedAnswers = answers.map(answer => entities.decode(answer))

    // decode correct answer
    const correct_answer = entities.decode(this.props.question.correct_answer)

    const shuffleAnswers = [...decodedAnswers].sort(() => Math.random() - 0.5)
    // shuffle answers so correct answer is not always the last one

    console.log('Question component props', this.props);
    console.log("shuffleAnswers", shuffleAnswers)
    console.log("answers", answers)

    const displayShuffleAnswers = shuffleAnswers.map(answer => {
      return (
        <div
          onClick={event => selectAnswer(event)}
          id={answer}
          key={answer}>
          {answer}
        </div>
      )
    })

    const selectAnswer = (event) => {
      // debugger
      // correct answer is here: this.props.question.correct_answer
      console.log(event.currentTarget.id)

      if (event.currentTarget.id === correct_answer) {
        event.currentTarget.style.background = "green"
      } else {
        event.currentTarget.style.background = "red"
      }
      // check if current answer is correct
      // if true turn background green
      // else background red
      // only one click
    }

    return (
      <div>
        <h2>{entities.decode(this.props.question.question)}</h2>
        {displayShuffleAnswers}
      </div>
    )
  }
}
