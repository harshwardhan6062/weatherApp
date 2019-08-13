const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../utils/getLocation.js')
const forecast= require('../utils/atmosphere.js')

const app = express()
const port = process.env.PORT || 3000

const servingDirectoryPath = path.join(__dirname , '../servingFiles')
const viewsDirectoryPath = path.join(__dirname , '../views')
const partialPath = path.join(__dirname , '../views/partialPaths')

app.set('view engine' , 'hbs')
app.use(express.static(servingDirectoryPath))
hbs.registerPartials(partialPath)

app.get('/about' , (req , res) => {
    res.render('about' , {
        title: 'ABOUT PAGE' , 
        name: 'Harshwardhan Koushik' , 
        age: 19
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        title: 'HELP PAGE !' ,
        name: 'Harshwardhan Koushik' , 
        age: 19
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/weather1' , (req , res) => {
    res.render('weather' , {
        title: 'WEATHER PAGE' , 
        name: 'Harshwardhan Koushik' , 
        age: 19
    })
})

app.get('' , (req , res) =>{
    res.render('index' , {
        title: 'HOME PAGE' , 
        name: 'Harshwardhan Koushik' ,
        age: '19'
    })
})

app.get('/help/*' , (req , res) => {
    res.send('THE CORRESPONDING HELP DOCUMENT COULD NOT BE FOUND !')
})

app.get('*' , (req , res) => {
    res.render('404' , {
        name: 'Harshwardhan Koushik' , 
        title: '404 PAGE NOT FOUND'
    })
})

app.listen(port , () => {
    console.log('Server is up on port 3000 !')
})
