class Api::V1::GardenPlantsController < ApplicationController

  def index
  @garden_plants = GardenPlant.all
  render json: @garden_plants, status: :ok
  end

  def create
    @garden_plant = GardenPlant.create(garden_plant_params)
    render json: @garden_plant, status: :created
  end

  def destroy
    @garden_plant = GardenPlant.find(params[:id])
    @garden_plant.destroy
    render json: @garden_plant, status: :ok
  end

  private
  def garden_plant_params
    params.require(:garden_plants).permit(:plant_id, :garden_id)
  end
end #end of garden plants controller
