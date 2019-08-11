const request = require('request')

const atmosphere = (latitude , longitude , callback) => {
    const url = 'https://api.darksky.net/forecast/bb949be443fd850a7cd25e89b8692557/' + latitude + ',' + longitude + '?units=si'

    request({url: url , json: true} , (error , data) => {
        if(error){
            callback(error , undefined)
        }

        else{
            callback(undefined , data.body.currently)
        }
    })
}

module.exports = atmosphere