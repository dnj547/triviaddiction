import React from 'react';
import Form from '../components/Form';
import ScoreBoardContainer from './ScoreBoardContainer';
import {Link} from 'react-router-dom';


export default class HomePageContainer extends React.Component {

  componentDidMount() {
    console.log('HomePageContainer componentDidMount');
  }

  render() {
    return (
      <div className="jumbotron question-rounded">
        <h1 style={{color: '#FBA9A7'}}>It's Trivia Time!!</h1>
        <ul className="col-sm-8 mx-auto">
          <li className="p-4 border-0 list-group-item">Select how long your round should last.</li>
          <li className="p-2 border-0 list-group-item">Choose a category.</li>
          <li className="p-4 border-0 list-group-item">Answer as many questions as you can before the timer runs out!</li>
        </ul>
        {this.props.loggedIn ?
          <div>
            <Link to='/play'>
              <button
                className="btn-lg border-0 teal-bg text-light"
                onClick={this.props.playGame}>
                Play
              </button>
            </Link>
          </div> :
          <Form
            errorMessage={this.props.errorMessage}
            logIn={this.props.logIn}
            handleForm={this.props.handleForm}
            userForm={this.props.userForm} />
        }
      </div>
    )
  }
}
