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
      event.target.style.background = "#508688"
      event.target.style.color = "#fff"

      this.props.updateCorrectAnswers(event)
      // only one click
      this.setState({
        answered: true
      })
    } else if (event.target.id !== this.state.correct_answer && !!event.target.id ){
      // else background red
      event.target.style.background = "#FBA9A7"
      event.target.style.color = "#212121"
      // only one click
      this.setState({
        answered: true
      })
    }
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

    const displayShuffleAnswers = this.state.answers.map(answer => {
      return (
        <li
          className="list-group-item pointer rounded-pill blue-border mb-4"
          id={answer}
          key={answer}
          data-question={this.props.question.question}>
          {answer}
        </li>
      )
    })

    return (
      <div className="row justify-content-center">

        <div className="col text-center brown-shadow border-0 p-4 m-4 question-rounded">
          <h2 className="p-4 m-4 bg-white">{entities.decode(this.props.question.question)}</h2>

          <div>
            <ul
              className="list-group"
              onClick={this.state.answered ? null : event => this.selectAnswer(event)}>
              <div className="row justify-content-center">
                <div className="col-sm-8">
                  {displayShuffleAnswers}
                </div>
              </div>
            </ul>

            {this.state.answered ? <button
              className="btn brown-bg text-light bold-it"
              onClick={(e)=>this.props.removeQuestionAnswered(e)}
              data-question={this.props.question.question}>
                Next Question
              </button> : null}
          </div>

        </div>
      </div>
    )
  }
}
