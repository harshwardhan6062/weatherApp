const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('../utils/getLocation.js')
const atmosphere = require('../utils/atmosphere.js')

const app = express()

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

app.get('/weather' , (req , res) => {
    if(!req.query.address){
        return res.send('PLEASE ENTER A ADDRESS !')
    }

    geoCode(req.query.address , (error , { latitude, longitude } = {}) => {
        if(error)
        return res.send('SOME CONNECTIVITY PROBLEM !')

        atmosphere(latitude , longitude , (err , foreCastData) => {
            if(err)
            return res.send('SOME INTERNET CONNECTIITY ISSUE !')

            res.send({
                forecast: 'The current atmosphere for ' + req.query.address + ' is ' + foreCastData.summary ,
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

app.listen(3000 , () => {
    console.log('Server is up on port 3000 !')
})
