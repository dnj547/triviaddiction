import React from 'react';
import Question from './Question'

export default class Questions extends React.Component {

  allQuestions = () => {
    return this.props.questions.slice(0,1).map(question => {
      return <Question
                key={question.question}
                question={question}
                removeQuestionAnswered={this.props.removeQuestionAnswered}
                updateCorrectAnswers={this.props.updateCorrectAnswers}/>

    })
  }

  render() {
    // console.log('Questions component props', this.props);
    console.log('Questions component state', this.state);
    return (
      <div>
        {this.allQuestions()}
      </div>
    )
  }
}
