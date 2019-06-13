class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.integer :score
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
