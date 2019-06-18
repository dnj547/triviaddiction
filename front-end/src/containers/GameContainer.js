import React from 'react';
import Questions from '../components/Questions';
import { DropdownButton, Dropdown, ProgressBar } from 'react-bootstrap';


// Countdown
import Countdown from 'react-countdown-now'
// end Countdown

export default class GameContainer extends React.Component {
  state = {
    timeNow: ''
  }

  renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <ProgressBar variant="warning" label={seconds} now={seconds} max={this.props.time} />
    )
  };
  componentDidMount() {
    console.log('GameContainer componentDidMount');
  }

  createCategoryDropdownItems = () => {
    // console.log('creating category dropdown items');
    // console.log(this.props.categories);
    return this.props.categories.map(category=>{
      return <Dropdown.Item
              onClick={(e)=>this.props.setCategory(e)}
              key={category.api_id}
              id={category.api_id}>{category.name}
            </Dropdown.Item>
    })
  }

  render() {
    console.log('GameContainer props', this.props);
    console.log('');
    return (
      <div className={this.props.gameStarted ? null : "row justify-content-center shadow m-4 p-4 question-rounded"}>
        {this.props.gameStarted ?
          <div>

            <Countdown
              renderer={this.renderer}
              onComplete={() => this.props.gameTimeOver()}
              date={Date.now() + this.props.time*1000} />
            <Questions
              gameRestart={this.props.gameRestart}
              currentUser={this.props.currentUser}
              gameStarted={this.props.gameStarted}
              gameOver={this.props.gameOver}
              gameTimeOver={this.props.gameTimeOver}
              gameStart={this.props.gameStart}
              playAgainApp={this.props.playAgainApp}
              categorySelected={this.props.categorySelected}/>
          </div>
          :
          <div>
            <h4 className="mt-4">Choose a time limit for your game:</h4>

            <button className="btn pink-bg text-white mr-2" id="15" onClick={(e)=>this.props.setTime(e)}>15 Seconds</button>

            <button className="btn pink-bg text-white" id="30" onClick={(e)=>this.props.setTime(e)}>30 Seconds</button>

            <button className="btn pink-bg text-white ml-2" id="60" onClick={(e)=>this.props.setTime(e)}>60 Seconds</button>

            <br/>
            <div>
              <h4 className="mt-4">Choose a category:</h4>
              {this.props.categorySelected.name ?
                <DropdownButton id="dropdown-basic-button"  title={this.props.categorySelected.name} variant="warning">
                  {this.createCategoryDropdownItems()}
                </DropdownButton>
                :
                <DropdownButton id="dropdown-basic-button" title="Category" variant="warning">
                  {this.createCategoryDropdownItems()}
                </DropdownButton>
              }
            </div>
            <div className="m-4">
              {this.props.timeSet && this.props.categorySet ?
                <button className="btn-lg border-0 teal-bg text-light" onClick={() => this.props.gameStart()}>Start Game</button>
                :
                <button className="btn-lg teal-bg-disabled border-0" disabled>Start Game</button>
              }
            </div>
          </div>
        }
      </div>
    )
  }
}
