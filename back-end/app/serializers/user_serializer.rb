class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :scores

  has_many :scores
end
