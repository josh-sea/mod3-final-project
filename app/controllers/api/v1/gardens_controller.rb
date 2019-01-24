class Api::V1::GardensController < ApplicationController

  def index
  @gardens = Garden.all
  render json: @gardens, status: :ok
  end

  def show
    @garden = Garden.find(params[:id])
    @plants = @garden.plants
    @render = {garden: @garden, plants: @plants}
    render json: @render, status: :ok
  end

  def create
    @garden = Garden.create(garden_params)
    render json: @garden, status: :created
  end


  def update
    @garden = Garden.find(params[:id])
    @garden.update(garden_params)
    if @garden.save
      render json: @garden, status: :ok
    else
      render json: { errors: @garden.errors.full_messages }, status: :unprocessible_entity
    end
  end


  def destroy
    @garden = Garden.find(params[:id])
    @garden.destroy
    render json: @garden, status: :ok
  end


  private

  def garden_params
    params.require(:garden).permit(:name, :description, :image)
  end


end
