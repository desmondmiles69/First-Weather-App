const request = require("request")


const geoCode = (address, callback)=>{
    const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGVzbW9uZG1pbGVzNjkiLCJhIjoiY2tkb2RqOG5wMDNubDJ0b2RlbGt0NTVjdCJ9.i4KPah6AnqIxbTwhgUeyTg"

    request({url: geoUrl, json: true}, (error, {body}) => {
        if(error)
            callback("Unable to connect to networks", undefined)
        else if(body.features.length == 0)
            callback("Unable to find location", undefined)
        else
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })

    })
}

module.exports = geoCode