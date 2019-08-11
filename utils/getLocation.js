const request = require('request')

const getLocation = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGFyc2g2MDYyIiwiYSI6ImNqeWNuMDF5djBqeGkzYnFtOXp0MmFrNjEifQ.r29m2jfNL1iCnCe_glqF-g'

    request({url: url , json: true} , (error , data) => {
        if(error){
            callback(error , undefined)
        }

        else{
            callback(undefined , {
                latitude: data.body.features[0].center[1],
                longitude: data.body.features[0].center[0]
            })
        }
    })
}

module.exports = getLocation

