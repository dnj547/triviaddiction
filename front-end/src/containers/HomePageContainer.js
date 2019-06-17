import React from 'react';
import Form from '../components/Form';
import ScoreBoardContainer from './ScoreBoardContainer';
import {Link} from 'react-router-dom';


export default class HomePageContainer extends React.Component {

  componentDidMount() {
    console.log('HomePageContainer componentDidMount');
  }

  render() {
    // console.log('HomePageContainer props', this.props);
    return (
      <div>
        <h2>Rules:</h2>
        <p>Answer as many questions as you can before the timer runs out!</p>
        {this.props.loggedIn ?
          <div>
            <Link to='/play'>
              <button onClick={this.props.playGame}>Play</button>
            </Link>
          </div> :
          <Form
            logIn={this.props.logIn}
            handleForm={this.props.handleForm}
            userForm={this.props.userForm} />
        }
      </div>
    )
  }
}
