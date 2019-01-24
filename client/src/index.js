document.addEventListener('DOMContentLoaded', function(){
  //#####################################################################
  const gardenSidebar = document.querySelector('#all-gardens');
  const topPlants = document.querySelector('#plant-garden');
  const bottomPlants = document.querySelector('#all-plants');
  const createGarden = document.querySelector("#create-garden")
  const gardenForm = document.querySelector("#garden-form")
  const nameInput = document.querySelector("#name-input")
  const imageInput = document.querySelector("#image-input")
  const textInput = document.querySelector("#text-input")
  const gardenDescription = document.querySelector("#garden-description")
  const gardenShowName = document.querySelector("#garden-show-name")
  const gardenShowDescription = document.querySelector("#garden-show-description")
  const gardenShowImage = document.querySelector("#garden-show-image")
  const deleteGarden = document.querySelector("#delete-garden")
  const editGarden = document.querySelector("#edit-garden")
//#####################################################################
  let allGardens = [];
  let allTopPlants = [];
  let allPlants = [];
  let gardenPlants = [];
  let currentGardenId = 0;
  let addGarden = false;
  let seeGarden = false;
//#####################################################################
  function formatGarden(garden){
    return `<li data-garden-id=${garden.id} class="list-group-item list-group-item-action">${garden.name}</li>`
}//end of format garden
//#####################################################################
  function parseJSON(response){
    return response.json();
  }//end of parse json
//#####################################################################
  function renderGardens(gardens){
    gardenSidebar.innerHTML = "";
    allGardens = gardens
    gardens.forEach(function(garden){
      gardenSidebar.innerHTML += formatGarden(garden)
    })//end of for each
  }//end of render Gardens function
//#####################################################################
  function getGardensFetch(){
      return fetch('http://localhost:3000/api/v1/gardens/')
      .then(parseJSON)
      .then(renderGardens)
    }
//#####################################################################
//--------plants
    function formatPlant(plant){
      return `
      <div style="margin:5px;width:10rem;height:20rem;" align="center" class="card text-black shadow-lg" data-card-id="${plant.id}">
          <img data-img-id=${plant.id} src=${plant.watered_image} class="card-img-top" alt="...">
          <div class="card-body" data-cardlocation-id="${plant.id}">
            <h5 class="card-title"> ${plant.name}</h5>
            <p class="card-text">${plant.description}</p>
            <button style="margin:5px" data-delete-id=${plant.id} class='btn btn-info'>DELETE</button>
          </div>
        </div>`
  }//end of format garden
//#####################################################################
  function formatPlantAdd(plant){
    return `
    <div style="margin:5px;width:10rem;height:20rem;"  align="center" class="card text-black shadow-lg" data-card-id="${plant.id}">
        <img src=${plant.watered_image} class="card-img-top bottom" alt="...">
        <div class="card-body" data-cardlocation-id="${plant.id}">
          <h5 class="card-title"> ${plant.name}</h5>
          <p class="card-text">${plant.description}</p>
          <button style="margin:5px" data-add-id=${plant.id} class='btn btn-info'>Add</button>
        </div>
      </div>`
  }//end of format garden
//#####################################################################
    function renderPlants(res, container){
      container.innerHTML = "";
      if (Object.keys(res).length == 2) {
      allTopPlants = res.plants;
      container.innerHTML = `<div id="garden-description" class="jumbotron" style="display:none"></div>`
      res.plants.forEach(function(plant){
        container.innerHTML += formatPlant(plant)
      })//end of for each
      } else{
      allPlants = res;
      res.forEach(function(plant){
        container.innerHTML += formatPlantAdd(plant)
      })//end of for each
      }
    }//end of render Plants function
//#####################################################################
    function getPlantsFetch(container, path){
        return fetch(`http://localhost:3000/api/v1/${path}`)
        .then(parseJSON)
        .then(res => renderPlants(res, container))
      }
//#####################################################################
      function deleteTopFetch(id){
        return fetch(`http://localhost:3000/api/v1/garden_plants/${id}`, {method: "DELETE"})
                  .then(parseJSON)
                  .then((r) => {
                    gardenPlants.splice(gardenPlants.indexOf(r),1)
                    getPlantsFetch(topPlants, `gardens/${currentGardenId}`)
                  })//end of then
      }//end of delete function
//#####################################################################
//-------------> end of helpers
//#####################################################################
// ------------> initial functions
  getGardensFetch() // rendering side bar gardens
// getPlantsFetch(topPlants, "gardens/2")
  getPlantsFetch(bottomPlants, "plants") // rendering all bottom plants
//#####################################################################
//-------------------------> Event Listeners
//#####################################################################
  gardenForm.addEventListener('submit',function(e){
    e.preventDefault()
    // nameInput.value
    // textInput.value
    if (gardenForm.dataset.toggleId == 0){
      fetch('http://localhost:3000/api/v1/gardens',{
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: nameInput.value,
          description: textInput.value,
          image: imageInput.value
        })
      })//end fetch
      .then(parseJSON)
      .then(r => {
        allGardens.push(r)
        currentGardenId = r.id
        topPlants.innerHTML = ""
        renderGardens(allGardens)
        gardenForm.reset();
        addGarden = false;
        gardenForm.style.display = "none";
        allTopPlants = [];
      })//end of thens and fetch
      gardenForm.dataset.toggleId = "";
      //end of create on submit
    } else if (gardenForm.dataset.toggleId == 1){
      fetch(`http://localhost:3000/api/v1/gardens/${currentGardenId}`,{
        method: "PATCH",
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: nameInput.value,
          description: textInput.value,
          image: imageInput.value
        })
      })//end fetch
      .then(parseJSON)
      .then(r => {
        const index = allGardens.findIndex(garden => garden.id == r.id);
        allGardens.splice(index,1,r)
        currentGardenId = r.id
        renderGardens(allGardens)
        gardenShowImage.src = r.image
        gardenShowName.innerText = r.name
        gardenShowDescription.innerText = r.description
        gardenForm.reset();
        addGarden = false;
        gardenForm.style.display = "none";
      })//end of edit
    }
  })//end of submit event listener
//#####################################################################
  createGarden.addEventListener('click', function(e){
    gardenForm.dataset.toggleId = 0;
    gardenForm.reset()
    addGarden = !addGarden
    if(addGarden){
      gardenForm.style.display = "block"
      topPlants.innerHTML = '';
    } else {
      gardenForm.style.display = "none"
    }

    gardenDescription.style.display = "none"

  })//end of create listener
//#####################################################################
  gardenSidebar.addEventListener("click", function(e){
    if (e.target.dataset.gardenId){
    getPlantsFetch(topPlants, `gardens/${e.target.dataset.gardenId}`)
    currentGardenId = e.target.dataset.gardenId;

    //assign garden id to description buttons (delete and edit)
    editGarden.dataset.editGarden = currentGardenId
    deleteGarden.dataset.deleteGarden = currentGardenId

    let counter = 0;
    function unwatered(){
      const plantCardObj = topPlants.querySelectorAll('[data-card-id]');
      const plantCardArr = Array.from(plantCardObj)
        //find a random plant in the garden, change the src to unwatered.
      const randPlant = plantCardArr[Math.floor(Math.random() * plantCardArr.length)];
        // const foundPlantCard = allTopPlants.find((plant)
        const foundPlant = allTopPlants.find((plant)=>{
            return plant.id == randPlant.dataset.cardId;
        })//end found plant
      if (randPlant.children[0].src === foundPlant.watered_image) {
        // alert(`${foundPlant.name} needs to be watered!`)
        randPlant.children[0].src = foundPlant.unwatered_image;
      }
      counter++
      if (counter === 10){
        clearInterval(loop)
      }
    }//end unwatered callback
    let loop = setInterval(unwatered, 10000);
    loop;

    const foundGarden = allGardens.find(function(garden){
      return garden.id == currentGardenId
    })

    //garden description logic
    gardenShowImage.src = foundGarden.image
    gardenShowName.innerText = foundGarden.name
    gardenShowDescription.innerText = foundGarden.description

    gardenDescription.style.display = "block"

    //create garden form hiding and seek
    addGarden = false;
    gardenForm.style.display = "none";
}
})//end garden select click Listener
//#####################################################################
  topPlants.addEventListener('click', function(e){
    if (e.target.dataset.deleteId){
      const foundPlant = allTopPlants.find(function(plant){
          return plant.id == e.target.dataset.deleteId
      })//end of find
      fetch('http://localhost:3000/api/v1/garden_plants')
        .then(parseJSON)
        .then((r) => {
          gardenPlants = r;
          const foundGP = gardenPlants.find((gp) => {
            return gp.plant_id == foundPlant.id && gp.garden_id == currentGardenId;
          })
          deleteTopFetch(foundGP.id)
          allTopPlants.splice(allTopPlants.indexOf(foundPlant),0)
          // renderPlants(allTopPlants,topPlants)
          // window.scrollTo(0,0)
        })//end of then
    } else if (e.target.dataset.imgId){
      const foundPlant = allTopPlants.find((plant)=>{
          return plant.id == e.target.dataset.imgId;
      })//end found plant
      const plantCardObj = topPlants.querySelectorAll('[data-card-id]');
      const plantCardArr = Array.from(plantCardObj)
      const foundPlantCard = plantCardArr.find(function(card){
        return card.dataset.cardId == foundPlant.id
      })//end find card
      foundPlantCard.children[0].src = foundPlant.watered_image
    }
  })//end topplant event listener
//#####################################################################
  bottomPlants.addEventListener('click', (e) =>{
    if (e.target.dataset.addId){
      const plantId = parseInt(e.target.dataset.addId)
      const gardenId = parseInt(currentGardenId)
      const gardenTopPlants = allTopPlants.map((plant)=>{
          return plant.id
      })//ed of map
      if (!gardenTopPlants.includes(plantId)){
        fetch('http://localhost:3000/api/v1/garden_plants',{
          method: "POST",
          headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            plant_id: plantId,
            garden_id: gardenId
          })
        })//end fetch
        .then(parseJSON)
        .then((r) => {
          const currentPlant = allPlants.find(function(plant){
            return plant.id === r.plant_id
          })
          topPlants.innerHTML += formatPlant(currentPlant)
          allTopPlants.push(currentPlant)
        })
        // window.scrollTo(0,0)
      }
      else {console.log('did not hit the API')}
    }
  })//end of bottom event listener
//#####################################################################
  gardenDescription.addEventListener('click', function(e){
    if (e.target.dataset.deleteGarden){
      fetch(`http://localhost:3000/api/v1/gardens/${currentGardenId}`, {
        method: "DELETE"
      })//end of delete fetch
      .then(parseJSON).then(res=>{
        const index = allGardens.findIndex(i => i.id == currentGardenId);
        allGardens.splice(index,1)
        renderGardens(allGardens)
        topPlants.innerHTML = ""
        gardenDescription.style.display = "none"
        currentGardenId = 0
      })//then response
      //end of if statement
    } else if (e.target.dataset.editGarden){
      gardenForm.dataset.toggleId = 1;
      addGarden = !addGarden
      if(addGarden){
        gardenForm.style.display = "block"
        const foundGarden = allGardens.find((garden)=>{
            return garden.id == currentGardenId;
        })//end of find
        nameInput.value = foundGarden.name
        textInput.value = foundGarden.description
        imageInput.value = foundGarden.image
      } else {
        gardenForm.reset()
        gardenForm.style.display = "none"
      }
    }//end of esle if for edit
  })//end of description event listener

  topPlants.addEventListener('mouseenter',(e)=>{
    e.target.style.cursor = "url('https://bit.ly/2RMKtY1'), auto";
  })

//#####################################################################


})//end of dom content loaded
//#####################################################################
