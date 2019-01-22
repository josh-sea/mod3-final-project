class CreatePlants < ActiveRecord::Migration[5.2]
  def change
    create_table :plants do |t|
      t.string :name
      t.string :description
      t.boolean :watered
      t.integer :watering_frequency
      t.boolean :harvested
      t.integer :harvest_frequency

      t.timestamps
    end
  end
end
