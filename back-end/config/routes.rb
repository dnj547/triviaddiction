Rails.application.routes.draw do
  # AuthController#login
  post '/login', to: "auth#login"
  post '/signup', to: "users#create"
  get '/profile', to: "users#profile"

  namespace :api do
    namespace :v1 do
      # Questions
      resources :questions, only: [:index]
      # Scores
      resources :scores, only: [:index, :create]
    end
  end
end
