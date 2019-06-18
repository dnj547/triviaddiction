class AuthController < ApplicationController
  def login
    # params: { username: '', password: '' }

    # find the user by their username
    user = User.find_by(username: params["username"])

    # authenticate the user
    if user
      is_authenticated = user.authenticate(params["password"])
    else
      # if user doesn't exist, automatically return false so error message can be thrown
      is_authenticated = false
    end

    if is_authenticated
      render json: { token: encode_token(user), id: user.id, username: user.username, scores: user.scores.reverse, high_score: user.high_score }
    else
      render json: { error: "Wrong username or password" }
    end
  end
end
