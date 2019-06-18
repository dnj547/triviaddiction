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
        <h1 style={{color: '#FBA9A7'}}>How to Play</h1>
        <div className="row">
          <div className="col-sm-4">
            <img src="cup.svg" height="400px" />
          </div>
          <div className="col-sm-8 mx-auto text-left">
            <h4 className="p-4 border-0 list-group-item">1. Choose a time limit and a category</h4>
            <h4 className="p-4 border-0 list-group-item">2. Answer as many questions as you can before the coffee runs out</h4>
            <h4 className="p-4 border-0 list-group-item">3. Play it again and again and again and again and again and again and again... until you’re <strong><u>triviaddicted</u></strong> :)</h4>
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
        </div>
      </div>
    )
  }
}
