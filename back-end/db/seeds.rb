# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# require 'rest-client'
#
# response = RestClient.get('https://opentdb.com/api.php?amount=10&difficulty=easy')
#
# puts response

User.create(username: "danielle", password: "pw123");
User.create(username: "edgar", password: "hello");
