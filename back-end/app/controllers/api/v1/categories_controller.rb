class Api::V1::CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories
  end

  def show
    category = Category.find_by(api_id: params[:id])

    # if category exist, fetch_questions
    if category && category.api_id != 100
      Category.fetch_questions(params[:id])
    # if Dan category is showing
    elsif category.api_id === 100
      category = Category.find_by(api_id: params[:id])
    else
      category = { message: "This category does not exist" }
    end

    render json: category
  end
end
