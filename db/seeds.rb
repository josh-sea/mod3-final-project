# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
Plant.create(name: 'Basil', description: 'so yummy', watered: true, watering_frequency: 2, harvested: false, harvest_frequency: 21, watered_image: 'https://bit.ly/2FRszwh', unwatered_image: 'https://bit.ly/2T4YJIi')
Plant.create(name: 'Thyme', description: 'great herb', watered: true, watering_frequency: 1, harvested: false, harvest_frequency: 21, watered_image: 'https://cdn1.medicalnewstoday.com/content/images/articles/266/266016/thyme.jpg', unwatered_image: 'https://bit.ly/2RI9N1o')
Plant.create(name: 'Tomatoes', description: 'red and ripe', watered: true, watering_frequency: 2, harvested: false, harvest_frequency: 42, watered_image: 'https://bit.ly/2CCv2aG', unwatered_image: 'https://bit.ly/2Dv4gTa')
Plant.create(name: 'Potatoes', description: 'chips please', watered: true, watering_frequency: 5, harvested: false, harvest_frequency: 30, watered_image: 'https://bit.ly/2RaoZiP', unwatered_image: 'https://bit.ly/2AUXofZ')
Plant.create(name: 'Bok Choy', description: 'bake it, stir-fry it man', watered: true, watering_frequency: 7, harvested: false, harvest_frequency: 25, watered_image: 'https://www.foodsforbetterhealth.com/wp-content/uploads/2018/09/Bok-Choy.jpg', unwatered_image: 'https://bit.ly/2Uapo6I')
Plant.create(name: 'Swiss Chard', description: 'fancy salad', watered: true, watering_frequency: 7, harvested: false, harvest_frequency: 26, watered_image: 'https://bit.ly/2AWgfHG', unwatered_image: 'https://bit.ly/2Raxomq')
Plant.create(name: 'Pumpkins', description: 'make a pie out of it', watered: true, watering_frequency: 7, harvested: false, harvest_frequency: 61, watered_image: 'https://images.unsplash.com/photo-1506917728037-b6af01a7d403?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80', unwatered_image: 'https://bit.ly/2FVAYi1')
Plant.create(name: 'Cucumbers', description: 'pickle party', watered: true, watering_frequency: 1, harvested: false, harvest_frequency: 28, watered_image: 'https://bit.ly/2Mt38lL', unwatered_image: 'https://bit.ly/2FUAkl6')
Plant.create(name: 'Roses', description: 'take time to smell them', watered: true, watering_frequency: 3, harvested: false, harvest_frequency: 180, watered_image: 'https://bit.ly/2FKX4ET', unwatered_image: 'https://bit.ly/2FZKTU7')
Plant.create(name: 'Sunflowers', description: 'sunshine and seeds', watered: true, watering_frequency: 1, harvested: false, harvest_frequency: 87, watered_image: 'https://bit.ly/2LsrmLv', unwatered_image: 'https://bit.ly/2MrYN2n')
