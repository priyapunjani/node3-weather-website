
// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
//when we run it on heroku
    fetch('/weather?address='+location).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error 
                //console.log(data.error)
            }else{
                messageOne.textContent = data.place
                messageTwo.textContent = data.forecast
                console.log(data.place)
                console.log(data.forecast)
            }
    
        })
    })

   /* fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error 
            //console.log(data.error)
        }else{
            messageOne.textContent = data.place
            messageTwo.textContent = data.forecast
            console.log(data.place)
            console.log(data.forecast)
        }

    })
})*/
    //console.log(location)
})



