class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :high_score

  # show only the scores value sorted by recency
  has_many :scores do
    object.scores.map do |obj|
      score = {
        score: obj.score,
        created_at: obj.created_at
      }
    end.reverse
  end
end
