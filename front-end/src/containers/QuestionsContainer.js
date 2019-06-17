import React from 'react';
import Question from '../components/Question';
import Scores from '../components/Scores';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default class QuestionsContainer extends React.Component {

  state = {
    question: {},
    answered: false,
    answers: [],
    correctAnswer: {},
    score: 0
  }

  componentDidMount() {
    console.log('QC component did mount');
    const questionsArray = this.props.questions
    console.log('questions array', questionsArray);
    let newQuestion = questionsArray[Math.floor(Math.random()*questionsArray.length)]
    console.log('question', newQuestion);
    this.setState({question: newQuestion}, ()=>this.setStates())
  }

  nextQuestion = () => {
    console.log('next question in questions container');
    const questionsArray = this.props.questions
    let question = questionsArray[Math.floor(Math.random()*questionsArray.length)]
    this.setState({
      question: question
    }, ()=>this.setStates())
  }

  selectAnswer = (e) => {
    // correct answer is here: this.props.question.correct_answer
    // console.log(e.target.id)
    // check if current answer is correct
    if (e.target.id === this.state.correct_answer) {
      // if true turn background green
      e.target.style.background = "#5CB75C"
      e.target.style.color = "#fff"
      this.setScore()
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

  setStates = () => {
    console.log('setting states');
    console.log('state', this.state);
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
    }, console.log('new state in set states', this.state))
  }

  setScore = () => {
    console.log('setting score in questions container');
    let newScore = this.state.score+1
    console.log('new score', newScore);
    this.setState({score: newScore})
  }

  render() {
    console.log('QuestionsContainer props', this.props);
    console.log('QuestionsContainer state', this.state);
    return (
      <div>
        <Scores score={this.state.score}/>
        {this.state.question ?
          <Question
          question={this.state.question}
          nextQuestion={this.nextQuestion}
          answers={this.state.answers}
          answered={this.state.answered}
          selectAnswer={this.selectAnswer}
          /> : null
        }
      </div>
    )
  }
}
