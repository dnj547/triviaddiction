class Category < ApplicationRecord
  has_many :questions, dependent: :destroy

  def self.fetch_questions(api_id)
    api = "https://opentdb.com/api.php?amount=50&category=#{api_id}"
    response = RestClient.get(api)
    json_response = JSON.parse(response)

    json_response["results"].each do |question|
      category_id = Category.find_or_create_by(name: question['category'])

      Question.find_or_create_by(
        category: category_id,
        difficulty: question['difficulty'],
        question: question['question'],
        correct_answer: question['correct_answer'],
        incorrect_answers: question['incorrect_answers'].join(", ")
      )
    end
  end
end
