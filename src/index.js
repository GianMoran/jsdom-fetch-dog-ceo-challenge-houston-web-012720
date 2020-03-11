console.log('%c HI', 'color: firebrick')
console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', ()=>{
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(response => response.json())
        .then(json => replaceImages(json));
    loadBreeds()
    let ul = document.querySelector('ul#dog-breeds')
    ul.addEventListener('click', (e) =>{
        e.toElement.style.color = "red"

    })
    let select = document.querySelector('select#breed-dropdown')
    select.addEventListener('change', (e)=>{
        loadBreeds(e.target.value)


    })
    
})

function loadBreeds(criteria = false){
    let breeds = document.querySelectorAll('li#breed')
    for (const breed of breeds){
        breed.remove()
    }
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
        fetch(breedUrl)
        .then(response => response.json())
        .then(json => removeByCriteria(json, criteria))
        .then(json => addBreeds(json));

}

function removeByCriteria(json, criteria){
    if (!criteria){
        return json
    }
    for (const breed in json.message){
        if (breed.charAt(0) != criteria){
            delete json.message[breed]
        }
    }
    return json
}

function addBreeds(json){
   
    let ul = document.querySelector('ul#dog-breeds')
    for(const breed in json.message){    
        let li = document.createElement('li');
        li.innerText = breed;
        li.id = "breed"
        ul.append(li);
    }
}
function replaceImages(json){
    let div = document.querySelector('div#dog-image-container')
    for(const link of json.message){
        let image = document.createElement('img');
        image.src = link;
       
        div.append(image);
    }
}