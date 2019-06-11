import React from 'react';
import Question from './Question'

export default class Questions extends React.Component {

  render() {
    console.log('Questions component props', this.props);
    return (
      <div>
        <Question />
      </div>
    )
  }
}
