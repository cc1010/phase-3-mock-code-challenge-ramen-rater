// write your code here

/// GET ALL IEMS FROM SERVER
fetch('http://localhost:3000/ramens')
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        renderItem (element) 
    });
})
let id = 0

/// RENDER ITEM FROM SERVER TO PAGE
function renderItem (element) {
    const images = document.getElementById('ramen-menu')
    const img = document.createElement('img')
    img.src = element.image
    images.appendChild(img)

    img.addEventListener('click', e=>{
        document.querySelector('img.detail-image').src = element.image
        document.querySelector('#ramen-detail h2').textContent = element.name
        document.querySelector('#ramen-detail h3').textContent = element.restaurant
        //document.querySelector('body p span').textContent = element.rating
        //document.querySelector('body p:nth-child(7)').textContent = element.comment
        id = element.id
    })
}


/// DELETE ITEM FROM SERVER
const deleteItem = document.getElementById('ramen-delete') 
deleteItem.addEventListener('click', e => {
    e.preventDefault()
    fetch(`http://localhost:3000/ramens/${id}`, {
        method:'DELETE'
    })
    .then(response => response.json())
    .then(data=> console.log(data));
})

//// UPDATE ITEM
const updateItem = document.getElementById('ramen-rating')
updateItem.addEventListener('submit', e=>{
    e.preventDefault()
    const ratingUpdate = document.querySelector('#rating').value
    const commentUpdate = document.querySelector('#comment').value 
    
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            rating: ratingUpdate,
            comment: commentUpdate
        }),
        headers: {
            'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
})







const form = document.getElementById('new-ramen')

///  CREATE NEW ITEM
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = e.target[0].value
    const restaurant =  e.target[1].value
    const image = e.target[2].value
    const rating = e.target[3].value
    const comment = e.target[4].value
    console.log(name, restaurant, image, rating, comment)

        // POST request using fetch()
    fetch("http://localhost:3000/ramens", {
        
        // Adding method type
        method: "POST",
        
        // Adding body or contents to send
        body: JSON.stringify({
            name: name,
            restaurant: restaurant,
            image: image,
            rating: rating,
            comment: comment
        }),
        
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    // Converting to JSON
    .then(response => response.json())
    // Displaying results to console
    .then(json => console.log(json));

    form.reset()
})



