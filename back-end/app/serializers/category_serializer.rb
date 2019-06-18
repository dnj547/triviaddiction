class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :api_id

  has_many :questions do
    object.questions.sample(50)
  end
end
