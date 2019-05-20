const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJpeWFwdW5qYW5pIiwiYSI6ImNqdnE3cDMzMDA5YWc0NG14enkwczZ0NmYifQ.n9HLa8DxuYMZFMZRzfqGPw&limit=1' //encodeURIComponent used for when address contains some special characters
    request({url : url , json : true}, (error,response) =>{
        //console.log(response)
        //console.log(response.body.features.length)
        if(error){
            callback('Unable to connect with weather services.',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                place: response.body.features[0].place_name
            })
            }
    })
}

module.exports = geocode