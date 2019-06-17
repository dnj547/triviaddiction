class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: true
  has_many :scores, dependent: :destroy

  def high_score
    map_score = self.scores.map {|score| score.score}

    map_score.max_by {|score| score}
  end
end
