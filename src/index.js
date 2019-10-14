let dogArray = [];
let dogBar;
let dogBox;
let goodDogFilter;

function fetchDogs(){
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogs => {
        dogArray = [...dogs];
        if(dogBar.children.length === 0){
            renderDogBar(dogArray)
        }
    })
}
function renderDogBarElement(dog){
    dogBar.insertAdjacentHTML("beforeend", `
    <button class="dog-bar-button" data-id=${dog.id} href=''>${dog.name}</button>
    `)
}

function renderDogBar(array){
    array.forEach(renderDogBarElement)
}


function getDogById(id){
    return dogArray.filter(dog => dog.id === parseInt(id))[0]
}

function doggleToggle(button){
    const dogId = button.closest("div#doggo").dataset.dog
    let dog = getDogById(dogId)
    const dogPatch = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dog.isGoodDog ? false : true
        })
    };
    fetch(`http://localhost:3000/pups/${dogId}`, dogPatch)
    .then(() => {
        fetchDogs();
        dog = getDogById(dogId);
        displayDogInfo(dog);
    })
}

function displayDogInfo(dog){
    if(dogBox.querySelector("div#doggo")){
        dogBox.querySelector("div#doggo").remove()
    }
    dogBox.insertAdjacentHTML("beforeend", `
    <div id=doggo data-dog="${dog.id}">
        <img class="dog-img" src=${dog.image}>
        <h2>${dog.name}</h2>
        <button id="good-dog-button">${dog.isGoodDog ? "Bad Dog!" : "Good Dog!"}</button>
    </div>
    `)
    dogBox.querySelector("button#good-dog-button").addEventListener("click", event => {doggleToggle(event.target)})
}
    
function dogBarButton(button){
    const dog = getDogById(button.dataset.id);
    displayDogInfo(dog)
}

function addEventListenerToDogBar(){
    dogBar.addEventListener("click", event => {
    if(event.target.className === "dog-bar-button"){
        dogBarButton(event.target)
    }
})
}

function dogFilter(button){
        let child = dogBar.lastElementChild;
        while(child){
            dogBar.removeChild(child)
            child = dogBar.lastElementChild
        };
        if(button.innerText === "Filter good dogs: OFF"){
            const filteredDogs = dogArray.filter(dog => dog.isGoodDog === true)
            renderDogBar(filteredDogs)
            button.innerText = "Filter good dogs: ON"
        }else{
            renderDogBar(dogArray)
            button.innerText = "Filter good dogs: OFF"
        }
}

function addEventListenerToDogFilter(){
    goodDogFilter.addEventListener("click", event => dogFilter(event.target))
}


document.addEventListener("DOMContentLoaded", () => {
    dogBar = document.querySelector('div#dog-bar');
    dogBox = document.querySelector("div#dog-info");
    goodDogFilter = document.querySelector("button#good-dog-filter")
    fetchDogs();
    addEventListenerToDogBar();
    addEventListenerToDogFilter();
})

