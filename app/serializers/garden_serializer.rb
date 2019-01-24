class GardenSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image
end
