class UsersController < ApplicationController
  def index
    user = User.all

    render json: user
  end

  def create
    # params: { username: '', password: '' }

    user = User.create(user_params)

    is_valid = user.valid?

    if is_valid
      render json: { token: encode_token(user) }
    else
      render json: { error: user.errors.full_message }
    end
  end

  def profile
    render json: logged_in_user
  end

  private

  def user_params
    params.permit(:username, :password)
  end
end
