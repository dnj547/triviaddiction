import React from 'react';
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


export default class Question extends React.Component {
  state = {
    question: {},
    answered: false,
    answers: [],
    correct_answer: ''
  }

  selectAnswer = (e) => {
    // correct answer is here: this.props.question.correct_answer
    // console.log(e.target.id)

    // check if current answer is correct
    if (e.target.id === this.state.correct_answer) {
      // if true turn background green
      e.target.style.background = "#5CB75C"
      e.target.style.color = "#fff"

      this.props.setScore()
      // only one click
      this.setState({
        answered: true
      })
    } else if (e.target.id !== this.state.correct_answer && !!e.target.id ){
      // else background red
      e.target.style.background = "#FC4A45"
      e.target.style.color = "#212121"
      // only one click
      this.setState({
        answered: true
      })
    }
  }

  componentDidMount() {
    console.log('Question component did mount');
    console.log('Question component state', this.state);
    // new array to house all answers
    const questionsArray = this.props.questions

    let question = questionsArray[Math.floor(Math.random()*questionsArray.length)]

    this.setState({
      question
    }, ()=>this.setStates())

  }

  setStates = () => {
    const answers = [...this.state.question.incorrect_answers, this.state.question.correct_answer]

    // decode answers in case they're regexed
    const decodedAnswers = answers.map(answer => entities.decode(answer))

    const shuffleAnswers = [...decodedAnswers].sort(() => Math.random() - 0.5)
    // shuffle answers so correct answer is not always the last one

    // decode correct answer
    const correct_answer = entities.decode(this.state.question.correct_answer)

    this.setState({
      answered: false,
      answers: shuffleAnswers,
      correct_answer: correct_answer
    })
  }

  nextQuestion = () => {
    const questionsArray = this.props.questions
    let question = questionsArray[Math.floor(Math.random()*questionsArray.length)]
    this.setState({
      question
    }, ()=>this.setStates())
  }

  showAnswers = () => {
    return this.state.answers.map(answer=>{
      return (
        <li
          className="list-group-item pointer rounded-pill blue-border mb-4"
          id={answer}
          key={answer}
          data-question={this.state.question.question}>
          {answer}
        </li>
      )
    })
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col text-center brown-shadow border-0 p-4 m-4 question-rounded">
          <h2 className="p-4 m-4 bg-white">{entities.decode(this.state.question.question)}</h2>
          <div>
            <ul
              className="list-group"
              onClick={this.state.answered ? null : e => this.selectAnswer(e)}>
              <div className="row justify-content-center">
                <div className="col-sm-8">
                  {this.showAnswers()}
                </div>
              </div>
            </ul>

            {this.state.answered ? <button
              className="btn brown-bg text-light bold-it"
              onClick={(e)=>this.nextQuestion()}
              data-question={this.state.question.question}>
                Next Question
              </button> : null}
          </div>

        </div>
      </div>
    )
  }
}
