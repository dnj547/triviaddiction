class UsersController < ApplicationController
  def index
    user = User.all

    render json: user
  end

  def create
    # params: { username: '', password: '' }
    # byebug
    user = User.create(user_params)

    is_valid = user.valid?

    if is_valid
      render json: { token: encode_token(user), id: user.id, username: user.username }
    else
      render json: { error: "Username already taken" }
    end
  end

  def edit
    logged_in_user.update(user_params)

    if logged_in_user.save
      render json: logged_in_user
    end
  end

  def profile
    render json: logged_in_user
  end

  def delete
    logged_in_user.destroy
    render json: { message: "Successfully deleted" }
  end

  private

  def user_params
    params.permit(:username, :password)
  end
end
