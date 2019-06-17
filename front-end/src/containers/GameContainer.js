import React from 'react';
import { DropdownButton, Dropdown, ProgressBar } from 'react-bootstrap';
import Countdown from 'react-countdown-now'
import Question from '../components/Question'
import Scores from "../components/Scores";

const OUR_API = 'http://localhost:3000/'
const TRIVIA_API_WITH_CATEGORY = 'https://opentdb.com/api.php?amount=50&category=' //add CATEGORY_ID

export default class GameContainer extends React.Component {
  state = {
    screen: 'setup', // 'playing', 'ending'
    time: 0,
    category: {},
    questions: [],
    score: 0
  }

  renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <ProgressBar variant="warning" label={seconds} now={seconds} max={this.state.time} />
    )
  }

  componentDidMount() {
    console.log('GameContainer componentDidMount');
  }

  fetchQuestions = () => {
    console.log('fetching questions');
    fetch(TRIVIA_API_WITH_CATEGORY + `${this.state.category.id}`)
    .then(r=>r.json())
    .then(questions=>{
      console.log('setting questions');
      this.setState({questions: questions.results})
    })
  }

  setScore = () => {
    console.log('setting score in game container');
    let newScore = this.state.score+1
    console.log('game container new score', newScore);
    this.setState({score: newScore})
  }

  createCategoryDropdownItems = () => {
    return this.props.categories.map(category=>{
      return <Dropdown.Item
              onClick={(e)=>this.setCategory(e)}
              key={category.id}
              id={category.id}>{category.name}
            </Dropdown.Item>
    })
  }

  setupScreen = () => {
    this.setState({
      screen: 'setup',
      time: 0,
      category: {}
    })
  }

  playingScreen = () => {
    this.fetchQuestions();
    this.setState({
      screen: 'playing'
    })
  }

  endingScreen = (e) => {
    fetch(OUR_API + 'api/v1/scores', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user_id: this.props.currentUser.id,
          score: parseInt(this.state.score)
        })
      })


    this.setState({
      screen: 'ending'
    })
  }

  setTime = (e) => {
    this.setState({
      time: e.currentTarget.id
    })
  }

  setCategory = (e) => {
    let categorySelected = this.props.categories.filter(category=>{
        return category.id === parseInt(e.currentTarget.id, 10)
      })
    this.setState({
      category: categorySelected[0]
    })
  }

  renderScreen = () => {
    if (this.state.screen === 'setup') {
      return (
        <div>
          <p>Hi {this.props.currentUser.username}</p>
        <div>
        <div>
          Choose a time limit for your game:
          <br/>
          <button className="btn btn-primary" id="15" onClick={(e)=>this.setTime(e)}>15 Seconds</button>
          <button className="btn btn-primary" id="30" onClick={(e)=>this.setTime(e)}>30 Seconds</button>
          <button className="btn btn-primary" id="60" onClick={(e)=>this.setTime(e)}>60 Seconds</button>
        </div>
        <br/>
        <div>
          Choose a category:
          <br/>
          {this.state.category.name ?
            <DropdownButton id="dropdown-basic-button" title={this.state.category.name} >
            {this.createCategoryDropdownItems()}
            </DropdownButton>
            :
            <DropdownButton id="dropdown-basic-button" title="Category" >
            {this.createCategoryDropdownItems()}
            </DropdownButton>
          }
        </div>
        <br/>
        {this.state.time !== 0 && this.state.category ?
          <button className="btn btn-primary" onClick={() => this.playingScreen()}>Start Game</button>
          :
          <button className="btn btn-primary" disabled>Start Game</button>
        }
        </div>

        </div>
      )
    } else if (this.state.screen === 'playing') {
      return (
        <div>
          <Countdown
          renderer={this.renderer}
          onComplete={() => this.endingScreen()}
          date={Date.now() + this.state.time*1000} />
          <div className="text-center">
            <b>Current Score:</b> {this.state.score}
          </div>
          <div>
            {this.state.questions.length > 0 ?
              <Question
              questions={this.state.questions}
              setScore={this.setScore}
              />
              : null
            }
          </div>
        </div>
      )
    } else if (this.state.screen === 'ending') {
      return (
        <div>

          <div>
            <Scores score={this.props.score}/>
            <p></p>
            <button
              data-user={this.props.currentUser.id}
              data-score={this.state.score}
              onClick={() => this.setupScreen()}>
              Play Again
            </button>
          </div>
        </div>
      )
    }
  }

  render() {
    console.log('GameContainer state', this.state);
    console.log('GameContainer props', this.props);
    console.log('');
    return this.renderScreen();
  }
}
