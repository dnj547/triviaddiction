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
        <h1 style={{color: '#FBA9A7'}}>How to Play</h1>
        <div className="col-sm-8 mx-auto">
          <h2 className="p-4 border-0 list-group-item" style={{'text-align': 'left', 'font-size': '20px'}}>1. Choose a time limit and a category</h2>
          <h2 className="p-4 border-0 list-group-item" style={{'text-align': 'left', 'font-size': '20px'}}>2. Answer as many questions as you can before the coffee runs out</h2>
          <h2 className="p-4 border-0 list-group-item" style={{'text-align': 'left', 'font-size': '20px'}}>3. Play it again and again and again and again and again and again and again... until you’re <strong>triviaddicted</strong> :)</h2>
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
