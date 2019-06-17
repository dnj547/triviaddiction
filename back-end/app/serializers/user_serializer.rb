class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  # show only the scores value sorted by recency
  has_many :scores do
    object.scores.map do |obj|
      obj.score
    end.reverse
  end
end
