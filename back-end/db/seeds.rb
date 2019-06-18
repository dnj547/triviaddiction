require 'rest-client'

API = 'https://opentdb.com/api.php?amount=50'

response = RestClient.get(API)
json_response = JSON.parse(response)

# puts json_response["results"]

def store_response(json_object)
  json_object.each do |question|
    Question.find_or_create_by(
      category: question['category'],
      difficulty: question['difficulty'],
      question: question['question'],
      correct_answer: question['correct_answer'],
      incorrect_answers: question['incorrect_answers'].join(", ")
    )
  end
end

store_response(json_response["results"])

# returns an array with objects
# require [category, difficulty, question, correct_answer, incorrect_answers (array)]
# json_response["results"][arrIdx][key]
# json_response["results"][0]['incorrect_answers'].join(", ").split(", ")

# Seed Users
User.create(username: "danielle", password: "pw123");
User.create(username: "edgar", password: "hello");
