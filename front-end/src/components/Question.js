import React from 'react';
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


export default class Question extends React.Component {

  showAnswers = () => {
    console.log('showing answers');
    return this.props.answers.map(answer=>{
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
  }

  render() {
    console.log('rendering question');
    // console.log('Question component state', this.state);
    console.log('Question component props', this.props);
    return (
      <div className="row justify-content-center">
        <div className="col text-center brown-shadow border-0 p-4 m-4 question-rounded">
          <h2 className="p-4 m-4 bg-white">{entities.decode(this.props.question.question)}</h2>
          <div>
            <ul
              className="list-group"
              onClick={this.props.answered ? null : e => this.props.selectAnswer(e)}>
              <div className="row justify-content-center">
                <div className="col-sm-8">
                  {this.showAnswers()}
                </div>
              </div>
            </ul>

            {this.props.answered ? <button
              className="btn brown-bg text-light bold-it"
              onClick={()=>{this.props.nextQuestion()}}
              data-question={this.props.question.question}>
                Next Question
              </button> : null}
          </div>

        </div>
      </div>
    )
  }
}
