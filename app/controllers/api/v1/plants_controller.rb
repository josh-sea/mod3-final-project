class Api::V1::PlantsController < ApplicationController

def index
@plants = Plant.all
render json: @plants, status: :ok
end

def show
  @plant = Plant.find(params[:id])
  render json: @plant, status: :ok
end

def create
  @plant = Plant.create(plant_params)
  render json: @plant, status: :created
end


def update
  @plant = Plant.find(params[:id])
  @plant.update(plant_params)
  if @plant.save
    render json: @plant, status: :ok
  else
    render json: { errors: @plant.errors.full_messages }, status: :unprocessible_entity
  end
end


def delete
  @plant = Plant.find(params[:id])
  @plant.destroy
  render json: @plant, status: :ok
end


private

def plant_params
  params.require(:plant).permit(:name, :description, :watered, :watering_frquency, :harvested, :harvest_frequency, :watered_image, :unwatered_image)
end



end
