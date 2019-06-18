class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :difficulty, :question, :correct_answer, :incorrect_answers

  # show only the id and name for category
  belongs_to :category do
    {
      id: object.category.id,
      name: object.category.name
    }
  end

  # create a new array for incorrect_answers
  def incorrect_answers
     object.incorrect_answers.split(", ")
  end
end
