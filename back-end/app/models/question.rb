class Question < ApplicationRecord


  def self.fetch_questions
    api = 'https://opentdb.com/api.php?amount=1'
    response = RestClient.get(api)
    json_response = JSON.parse(response)

    json_response["results"].each do |question|
      Question.find_or_create_by(
        category: question['category'],
        difficulty: question['difficulty'],
        question: question['question'],
        correct_answer: question['correct_answer'],
        incorrect_answers: question['incorrect_answers'].join(", ")
      )
    end
  end
end
