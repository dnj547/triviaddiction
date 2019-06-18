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
      <div>
        <h1 style={{color: '#FBA9A7'}}>It's Trivia Time!!</h1>
        <div className="row mx-auto">
          <div className="col-sm-4">
            <img src="cup.svg" className="bg-white p-4" height="400px" />
          </div>
          <div className="col-sm-8 bg-light text-left">
            <ol>
              <li>
                <h4>
                  Select how long your round should last.
                </h4>
              </li>
              <li>
                <h4>
                  Choose a category.
                </h4>
              </li>
              <li>
                <h4>
                  Answer as many questions as you can before the timer runs out!
                </h4>
              </li>
            </ol>

          </div>
        </div>
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
