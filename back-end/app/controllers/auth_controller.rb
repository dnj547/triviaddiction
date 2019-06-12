class AuthController < ApplicationController
  def login
    # params: { username: '', password: '' }

    # find the user by their username
    user = User.find_by(username: params["username"])

    # authenticate the user
    is_authenticated = user.authenticate(params["password"])

    if is_authenticated
      render json: { token: encode_token(user) }
    else
      render json: { error: "Wrong username or password" }
    end
    # "log in the user"
  end
end
