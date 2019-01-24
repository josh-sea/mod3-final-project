Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :garden_plants
    end
  end
  namespace :api do
    namespace :v1 do
      resources :plants
    end
  end
  namespace :api do
    namespace :v1 do
      resources :gardens
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    end
  end
end #end of routes
