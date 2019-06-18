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
      <div className="row shadow question-rounded">
        <div className="col-sm-4">
          <img src="cup-brown.svg" alt="Coffee Cup" className="m-4" height="400px" />
        </div>
        <div className="col-sm-8 mx-auto text-left">
          <h1 className="p-4 text-center" style={{color: '#FBA9A7'}}>How to Play</h1>
          <h4 className="p-4">1. Choose a time limit and a category</h4>
          <h4 className="p-4">2. Answer as many questions as you can before the coffee runs out</h4>
          <h4 className="p-4">3. Play it again and again and again and again and again and again and again... until you’re <strong><u>triviaddicted</u></strong> :)</h4>

          <div className="p-4">
            {this.props.loggedIn ?
              <div className="row justify-content-center">
                <Link to='/play'>
                  <button
                    className="btn-lg border-0 teal-bg text-light"
                    onClick={this.props.playGame}>
                    Play Game
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
        </div>
      </div>
    )
  }
}
