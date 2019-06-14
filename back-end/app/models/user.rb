class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: true
  has_many :scores, dependent: :destroy
end
