Rails.application.routes.draw do
  # AuthController#login
  post '/login', to: "auth#login"
  post '/signup', to: "users#create"
  get '/profile', to: "users#profile"
  patch '/edit', to: "users#edit"
  delete '/delete', to: "users#delete"
  get '/api/v1/users', to: "users#index"

  namespace :api do
    namespace :v1 do
      # Questions
      resources :questions, only: [:index]
      # Categories
      resources :categories, only: [:index, :show]
      # Scores
      resources :scores, only: [:index, :create, :delete]
    end
  end
end
