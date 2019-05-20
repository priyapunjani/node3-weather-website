const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/17756d22bfe0d88db74d10438e98508f/'+ latitude + ', ' + longitude
    request({url:url , json : true }, (error, response) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(response.body.error){
            callback('Unable to find locations', undefined)
        }else{
            callback(undefined, 'It is currently ' + response.body.currently.temperature +  ' degrees out.There is ' + response.body.currently.precipProbability + '%   chances of rain.')
        }
    })
}
module.exports = forecast