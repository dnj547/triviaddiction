class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :category, :difficulty, :question, :correct_answer, :incorrect_answers

  def incorrect_answers
     object.incorrect_answers.split(", ")
  end
end
