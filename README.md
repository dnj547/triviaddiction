# Triviaddiction
* **Description:** A trivia game web app
* **Created:** June 2019 (Flatiron School Mod 4)
* **Languages:** Ruby on Rails, React
* **Planning Document:** [Taskade](https://www.taskade.com/v/MHcaFPFs8dL637rR)
* **Collaborator:** Edgar Ong (@eddgr)

[![Triviaddiction Demo Video](https://user-images.githubusercontent.com/35350822/62050986-6b26b400-b1e0-11e9-842c-4e9eb3d5add0.png)](https://s3.us-east-2.amazonaws.com/video.9/Triviaddiction.mp4)

## What can I do with Triviaddiction?
* sign up or log in
* play trivia game (select timer and question category)
* update or delete account
* see high scores

## How do I use Triviaddiction?
open terminal
```
git clone https://github.com/dnj547/triviaddiction.git
cd triviaddiction
cd backend
bundle
rails db:create && rails db:migrate && rails db:seed && rails s
```
open second terminal window
```
cd frontend
npm start
yes
```
