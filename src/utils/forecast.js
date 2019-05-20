const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/17756d22bfe0d88db74d10438e98508f/'+ latitude + ', ' + longitude
    request({url:url , json : true }, (error, response) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(response.body.error){
            callback('Unable to find locations', undefined)
        }else{
          //  console.log(response.body.daily.data[0])
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature +  ' degrees out. This high today is a ' + response.body.daily.data[0]. temperatureHigh + ' with a low of ' + response.body.daily.data[0].temperatureLow + '. There is ' + response.body.currently.precipProbability + '%   chances of rain.')
        }
    })
}
module.exports = forecast