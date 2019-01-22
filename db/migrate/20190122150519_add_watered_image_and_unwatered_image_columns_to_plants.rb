class AddWateredImageAndUnwateredImageColumnsToPlants < ActiveRecord::Migration[5.2]
  def change
    add_column :plants, :watered_image, :string
    add_column :plants, :unwatered_image, :string
  end
end
