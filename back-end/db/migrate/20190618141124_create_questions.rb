class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :category
      t.string :difficulty
      t.string :question
      t.string :correct_answer
      t.text :incorrect_answers

      t.timestamps
    end
  end
end
