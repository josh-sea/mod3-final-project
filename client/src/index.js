document.addEventListener('DOMContentLoaded', function(){
  const gardenSidebar = document.querySelector('#all-gardens');
  const topPlants = document.querySelector('#plant-garden');
  const bottomPlants = document.querySelector('#all-plants');
  let allGardens = [];
  let allTopPlants = []
  let allPlants = [];

//----------> helpers
  function formatGarden(garden){
    return `
    <li data-garden-id=${garden.id} class="list-group-item list-group-item-action">${garden.name}</li>
    `
}//end of format garden

  function parseJSON(response){
    return response.json();
  }//end of parse json

  function renderGardens(gardens){
    gardenSidebar.innerHTML = "";
    allGardens = gardens.garden
    gardens.forEach(function(garden){
      gardenSidebar.innerHTML += formatGarden(garden)
    })//end of for each
  }//end of render Gardens function

  function getGardensFetch(){
      return fetch('http://localhost:3000/api/v1/gardens/')
      .then(parseJSON)
      .then(renderGardens)
    }

//--------plants
    function formatPlant(plant){
      return `
      <div style="margin:5px;width:18rem" class="card text-black shadow-lg" data-card-id="${plant.id}">
          <img src=${plant.watered_image} class="card-img-top" alt="...">
          <div class="card-body" data-cardlocation-id="${plant.id}">
            <h5 class="card-title"> ${plant.name}</h5>
            <p class="card-text">${plant.description}</p>
            <button style="margin:5px" data-delete-id=${plant.id} class='btn btn-dark'>DELETE</button>
          </div>
        </div>  `
  }//end of format garden

  function formatPlantAdd(plant){
    return `
    <div style="margin:5px;width:18rem" class="card text-black shadow-lg" data-card-id="${plant.id}">
        <img src=${plant.watered_image} class="card-img-top" alt="...">
        <div class="card-body" data-cardlocation-id="${plant.id}">
          <h5 class="card-title"> ${plant.name}</h5>
          <p class="card-text">${plant.description}</p>
          <button style="margin:5px" data-add-id=${plant.id} class='btn btn-dark'>Add</button>
        </div>
      </div>  `
  }//end of format garden

    function renderPlants(res, container){
      container.innerHTML = "";
      if (Object.keys(res).length == 2) {
      allTopPlants = res.plants;
      allTopPlants.forEach(function(plant){
        container.innerHTML += formatPlant(plant)
      })//end of for each
    }else{
      allPlants = res;
      allPlants.forEach(function(plant){
        container.innerHTML += formatPlantAdd(plant)
      })//end of for each
    }
    }//end of render Plants function

    function getPlantsFetch(container, path){
        return fetch(`http://localhost:3000/api/v1/${path}`)
        .then(parseJSON)
        .then(res => renderPlants(res, container))
      }
//-------------> end of helpers
// ------------> initial functions
getGardensFetch()
getPlantsFetch(topPlants, "gardens/2")
getPlantsFetch(bottomPlants, "plants")

//-------------------------> Event Listeners

gardenSidebar.addEventListener("click", function(e){
  console.log(e.target)

})

})//end of dom content loaded
