class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :watered, :watering_frequency, :harvested, :harvest_frequency, :watered_image, :unwatered_image
end
