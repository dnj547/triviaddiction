import React from 'react';

export default class Question extends React.Component {

  render() {
    console.log('Question component props', this.props);
    return (
      <div>
        Question
      </div>
    )
  }
}
