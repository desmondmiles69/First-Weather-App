const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + encodeURIComponent(latitude) + "&lon=" + encodeURIComponent(longitude) +"&exclude={part}&appid=1fb47d1f346d7ff9153670491d4dda75&units=metric"
    request({url, json: true}, (error, {body}) => {
         if(error)
            callback("Unable to connect to networks", undefined)
        if(body.message)
            callback("Unable to find location", undefined)
        else 
            callback(undefined, body.daily[0].weather[0].description +" It is currently " + body.current.temp + " degrees out. There is " + body.current.clouds +"% chances of rain")
    })
}

module.exports = forecast

