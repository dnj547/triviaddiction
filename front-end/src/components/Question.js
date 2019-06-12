import React from 'react';
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


export default class Question extends React.Component {

  render() {
    console.log('Question component props', this.props);
    return (
      <div>
        <h2>{entities.decode(this.props.question.question)}</h2>
      </div>
    )
  }
}
