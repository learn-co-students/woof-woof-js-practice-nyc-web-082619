const filter = document.querySelector('#filter-div');
const goodDogButton = document.querySelector('#good-dog-filter');
const dogBar = document.querySelector('#dog-bar');
const dogSummery = document.querySelector('#dog-summary-container');
const isGoodButton = document.querySelector('.good-dog'); 
const dogInfo = document.querySelector('#dog-info'); 
const newSpan = document.querySelector('#name-span'); 
const goodBtn = document.querySelector('#good-btn')
let wantedDog

fetch('http://localhost:3000/pups').then(function(response){
    return response.json()
}).then(function(dogs){
    dogs.forEach(function(dog){
        const newSpan = document.createElement('span');
        newSpan.setAttribute('class', 'name-span');
        newSpan.setAttribute('data-id', dog.id)
        newSpan.innerHTML = dog.name;
        dogBar.appendChild(newSpan)
    })
})

dogBar.addEventListener('click', function(event){
    wantedDog = event.target.dataset.id;
    let dogName = event.target.innerText;
    fetch(`http://localhost:3000/pups/${wantedDog}`).then(function(response){
        return response.json()
    }).then(dog => dogProfile(dog))

})

function dogProfile(dog){
    let h2 = document.createElement('h2')
    h2.innerText= dog.name;  
    let img = document.createElement('img')
    img.src = dog.image;
    let goodBtn = document.createElement('button')
    goodBtn.addEventListener('click', function(event){
        let good;
        if(goodBtn.innerText === 'Bad Dog!'){
            goodBtn.innerText = 'Good Dog!';
            good = true
        } else if (goodBtn.innerText === 'Good Dog!'){
            goodBtn.innerText = 'Bad Dog!';
            good = false
        }
        fetch(`http://localhost:3000/pups/${wantedDog}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({isGoodDog: good}) 
    })
    })
    goodBtn.setAttribute('class', 'good-btn')
    goodBtn.innerText = dog.isGoodDog;
    if(dog.isGoodDog === false) {
        goodBtn.innerText = 'Bad Dog!';
    } else if(dog.isGoodDog === true){
        goodBtn.innerText = 'Good Dog!';
    }
    dogInfo.append(h2, img, goodBtn)
}



