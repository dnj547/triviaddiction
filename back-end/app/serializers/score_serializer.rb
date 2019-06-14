class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :user, :score, :created_at

  belongs_to :user
end
