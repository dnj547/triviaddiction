require 'rest-client'

# API = 'https://opentdb.com/api.php?amount=50'
#
# response = RestClient.get(API)
# json_response = JSON.parse(response)

# puts json_response["results"]

def store_response(json_object)
  json_object.each do |question|
    # byebug
    category_id = Category.find_or_create_by(name: question[:category])

    Question.find_or_create_by(
      category: category_id,
      # difficulty: question['difficulty'],
      question: question[:question],
      correct_answer: question[:correct_answer],
      incorrect_answers: question[:incorrect_answers].join(", ")
    )
  end
end

# store_response(json_response["results"])

# returns an array with objects
# require [category, difficulty, question, correct_answer, incorrect_answers (array)]
# json_response["results"][arrIdx][key]
# json_response["results"][0]['incorrect_answers'].join(", ").split(", ")

# Seed Categories
categories= [[9,"General Knowledge"],[10,"Entertainment: Books"],[11,"Entertainment: Film"],[12,"Entertainment: Music"],[14,"Entertainment: Television"],[15,"Entertainment: Video Games"],[16,"Entertainment: Board Games"],[17,"Science & Nature"],[18,"Science: Computers"],[21,"Sports"],[22,"Geography"],[23,"History"],[27,"Animals"],[28,"Vehicles"],[31,"Entertainment: Japanese Anime & Manga"],[32,"Entertainment: Cartoon & Animations"],[100,"Flatiron School: Dan Edition"]]

categories.each do |category|
  Category.find_or_create_by(api_id: category[0], name: category[1])
end

# Dan Questions
dan_questions = [{
  "category": "Flatiron School: Dan Edition",
  "question": "What is the name of our cohort?",
  "correct_answer": "Dan, stop eating the internet!",
  "incorrect_answers": ["Dan","Stop eating the internet, Dan!","040119"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "What is the biggest threat to the internet?",
  "correct_answer": "Dan",
  "incorrect_answers": ["Sharks","Coffee","Earthquakes"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who bought the first snacks?",
  "correct_answer": "Troy",
  "incorrect_answers": ["Danielle","Ferris","Kevin"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who are you?",
  "correct_answer": "Dan",
  "incorrect_answers": ["Dan","Dan","Dan"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who likes cottage cheese?",
  "correct_answer": "Ali",
  "incorrect_answers": ["Grandmas","Mothers","Sebastian"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who was our Mod 1 instructor?",
  "correct_answer": "Alex",
  "incorrect_answers": ["Tashawn","Jeff","Tim"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who was our Mod 2 instructor?",
  "correct_answer": "Tashawn",
  "incorrect_answers": ["Ferris","Evans","Tim"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who was our Mod 3 instructor?",
  "correct_answer": "Evans",
  "incorrect_answers": ["Tim","Alex","Will"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who was our Mod 4 instructor?",
  "correct_answer": "Tim",
  "incorrect_answers": ["Alex","God","Tashawn"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who bought the beers when the keg was broken?",
  "correct_answer": "Ferris",
  "incorrect_answers": ["Troy","Kevin","WeWork"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who makes things harder for himself?",
  "correct_answer": "Jeff",
  "incorrect_answers": ["Jeff","Jeff","Jeff"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "What painter does Sebastian love?",
  "correct_answer": "Bob Ross",
  "incorrect_answers": ["Vincent Van Gogh","Claude Monet","Ali the Great"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who got accepted into NYU?",
  "correct_answer": "Sarah",
  "incorrect_answers": ["Woohoo","Congrats","Woot woot"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who can speak backwards?",
  "correct_answer": "Mom",
  "incorrect_answers": ["Ali","Grandma","Yoda"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "When did we get chairs?",
  "correct_answer": "When we took them",
  "incorrect_answers": ["Mod 4","Too late","Never got a chair"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "What do the coffee cups say?",
  "correct_answer": "Always do what you love wework",
  "incorrect_answers": ["Flatiron School is amazing","learn love code","Always coding, never quitting"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "What’s the Flatiron School slogan?",
  "correct_answer": "learn love code",
  "incorrect_answers": ["If you're not first, you're last","It's all a turing test","Stress out for no reason!"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "How many mods are there?",
  "correct_answer": "5",
  "incorrect_answers": ["8","1","Dan"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "How do you feel about sushi saga?",
  "correct_answer": "Sebastian is a madman",
  "incorrect_answers": ["Hate it!","Love it!","It was fine."]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Which programming language is the best?",
  "correct_answer": "HTML",
  "incorrect_answers": ["Ruby","JavaScript","CSS"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "What will you do after Flatiron School?",
  "correct_answer": "Die",
  "incorrect_answers": ["Get a job","Continue learning forever","Live at Flatiron School until they kick me out"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Which mod was your favorite?",
  "correct_answer": "Mod 4",
  "incorrect_answers": ["Mod 3","Mod 2","Mod 1"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "What did Edgar, Danielle, Ferris, and Troy win at the OpenSource ERPs Hackathon?",
  "correct_answer": "Most diverse team and unique idea",
  "incorrect_answers": ["A big piece of cardboard","They won something?","Unclear"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "How many women are in our cohort?",
  "correct_answer": "5",
  "incorrect_answers": ["10","2","4"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "What game is played by our cohort most often at happy hours?",
  "correct_answer": "Stack cup",
  "incorrect_answers": ["Slap cup","Beer pong","Rugby"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Bubble tea?",
  "correct_answer": "Bubble tea",
  "incorrect_answers": ["Bubble tea","Bubble","Tea"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Why Flatiron School?",
  "correct_answer": "It's the best",
  "incorrect_answers": ["It's so cheap","It's easy","Everyone is very serious here"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Why do we write and present blog posts?",
  "correct_answer": "For funsies",
  "incorrect_answers": ["Because we have to","To create an online presence","Torture"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Why are we here?",
  "correct_answer": "42",
  "incorrect_answers": ["To learn, love, and code","For the community happy hours","Dan"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who is your mom?",
  "correct_answer": "Ali",
  "incorrect_answers": ["Ali","Ali","Sebastian"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who are the best TCFs?",
  "correct_answer": "Ali & Sebastian",
  "incorrect_answers": ["Jeff & Dan","Ferris & Danielle","Rob & Kevin"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who has pink hair and just got a hair cut?",
  "correct_answer": "Danielle",
  "incorrect_answers": ["Edgar","Dan","Soyeong"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Why is Flatiron School in FiDi?",
  "correct_answer": "What are you talking about? We're in the Flatiron district right now.",
  "incorrect_answers": ["Something about flat irons","FiDi is beautiful and we love it here","The Flatiron building is full"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Statue of Liberty?",
  "correct_answer": "NO",
  "incorrect_answers": ["Nah","Not today","No thank you"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Are you going to Game Jam?",
  "correct_answer": "Yep",
  "incorrect_answers": ["Yes","Yeah","Probably"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who does Tashawn hate?",
  "correct_answer": "Drake",
  "incorrect_answers": ["Sebastian","Ali","Jeff"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "Who is the most powerful instructor?",
  "correct_answer": "Evans",
  "incorrect_answers": ["Not Evans","Probably Evans","Idk"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "What would you do differently if you had to repeat your time at Flatiron School?",
  "correct_answer": "Steal chairs earlier",
  "incorrect_answers": ["Work harder","Be more lazy","Study more"]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
},
{
  "category": "Flatiron School: Dan Edition",
  "question": "",
  "correct_answer": "",
  "incorrect_answers": ["","",""]
}]

store_response(dan_questions)

# Seed Users
User.create(username: "danielle", password: "pw123");
User.create(username: "edgar", password: "hello");
