class Api::V1::QuestionsController < ApplicationController
  def index
    render json: { message: "hello from questions" }
  end
end
