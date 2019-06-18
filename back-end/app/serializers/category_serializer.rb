class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :api_id

  has_many :questions
end
