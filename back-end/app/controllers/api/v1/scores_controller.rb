class Api::V1::ScoresController < ApplicationController
  def index
    # sort highest score by most recent in descending order
    @scores = Score.all.sort_by {|score| score.created_at}.reverse
    
    render json: @scores
  end

  def create
    score = Score.create(score_params)

    if score.valid?
      render json: score
    else
      render json: {
        error: score.errors.full_message
      }
    end
  end

  private

  def score_params
    params.permit(:user_id, :score)
  end
end
