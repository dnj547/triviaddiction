class Api::V1::QuestionsController < ApplicationController
  def index
    Question.fetch_questions
    questions = Question.all
    render json: questions
  end
end
