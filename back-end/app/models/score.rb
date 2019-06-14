class Score < ApplicationRecord
  belongs_to :user

  def self.player_scores
    # sort highest score by most recent in descending order
    sorted_score = Score.all.sort_by {|score| score.created_at}.reverse

    # create a new hash to store and sort by username
    scores = Hash.new{|hash, key| hash[key] = []}

    sorted_score.map do |score|
      scores[score.user_id].push(score)
    end

    return scores
  end

end
