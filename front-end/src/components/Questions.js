import React from 'react';
import Question from './Question'

export default class Questions extends React.Component {
  allQuestions = () => {
    return this.props.questions.slice(0,1).map(question => {
      return <Question key={question.question} question={question} />
    })
  }
  render() {
    console.log('Questions component props', this.props);
    return (
      <div>
        {this.allQuestions()}
      </div>
    )
  }
}
