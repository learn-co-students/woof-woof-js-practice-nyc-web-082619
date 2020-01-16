let dogInfo = document.querySelector("#dog-info")
document.addEventListener('DOMContentLoaded', () => {
    
    let dogBar = document.querySelector("#dog-bar")
    
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(resp => getDogsNames(resp))
    
    
    getDogsNames = dogs => {
        dogs.forEach(dog => {
            dogBar.insertAdjacentHTML('beforeend',  
            `
            <span id="${dog.id}">${dog.name}</span> 
            `) 
        })
    }
    
    let dogInfo = document.querySelector("#dog-info")


    dogBar.addEventListener("click", event => {
        console.log(event.target.id)
        fetch(`http://localhost:3000/pups/${event.target.id}`)
            .then(resp => resp.json())
            .then((dog) => displayDogInfo(dog)) 
        })
            
    displayDogInfo = dog => {
        console.log(dog.isGoodDog)
        dogInfo.innerHTML = 
            `
            <img src=${dog.image}></img>
            <h2>${dog.name}</h2>
            <button id=${dog.id} data-good=${dog.isGoodDog} >${dog.isGoodDog ? "Good Dog!": "Bad Dog!" }</button>
            `
    }

    dogInfo.addEventListener("click", event => {
        let value = event.target.dataset.good
        let v 
        let newValue = !v
        console.log(newValue)

        if (value.includes("true")) {
            v = true
            
        } 
        if (value.includes("false")) {
            v = false
        }
    

        if (event.target.tagName === "BUTTON") {
            fetch(`http://localhost:3000/pups/${event.target.id}`, {
                method: "PATCH",
                headers:
                {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify(
          
                  {
                      
                      isGoodDog: newValue
                  }
                )
              })
            } 
    })

            
})
