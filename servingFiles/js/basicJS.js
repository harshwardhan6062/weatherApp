const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = "HELLO WORLD"
messageTwo.textContent = ""

weatherForm.addEventListener('submit' , (e) => { 
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch('https://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) =>{
            if(data.error)
                messageOne.textContent = data.error

            else{
                messageOne.textContent = "hello"
                messageTwo.textContent = ""
            }
        })
    })
})