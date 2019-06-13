# triviaddiction

Triviaddiction:

Theme Ideas:
* Coffee is running out (the timer is the coffee level)
    * Wrong answer - coffee is spilled
    * 3 right answers in a row - fresh coffee

* App:
  - **state**
    - currentUser, userScores, allScores
    - gameOver, gameStarted
  * Nav - Logo (home), Sign Up / Log In / Log Out, Username
  * HomePageContainer (not logged in)
      * Rules
      * Play button - triggers new game in GameContainer
  * ScoresContainer (logged in)
    * MyScores
    * HighScores
  * GameContainer (logged in)
    - **state**
      - questions, questionsAnswered (answeredCorrectly: true/false), timer
    - startButton
    * Timer
    * Questions
        * Score
        * Question
    * Ending

Using:
* Rails back end API
    * Users - id, username, password
    * Scores - id, score
* Trivia API
    * https://opentdb.com/api_config.php
* React front end

MVP:
* User can see rules of how to play the game
* User can play the game (answer questions before a timer runs out & see if they got it right or not)

Full Product:
* User can sign up, log in, log out
* User can play the game multiple times & their scores are saved
* User can see their own scores and high scores from other users

Other info:
* Show difficulty of questions - points are based on difficulty

Stretch Goals:
* User can pick a category for their game
* User can pick a category per question - categories have different point multipliers
* User can add their own questions
* Option for our own custom category - Flatiron School

CRUD actions:
* User - create user, update username, delete account



Do:
* in front-end:
  * npm install
* in back-end:
  * rails db:create && rails db:migrate && rails db:seed
