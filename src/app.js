const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geoCode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000
//Setting up paths
const publicDirPath = path.join(__dirname, "../public")
const viewsDirPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setting up handlebars
app.set("view engine", "hbs")
app.set("views", viewsDirPath)
hbs.registerPartials(partialsPath)

//Setting for Static Stuffs
app.use(express.static(publicDirPath))

app.get("", (req,res) => {
    res.render("index", {
        title: "Weather App",
        name: "Pratik Deshmukh"
    })
})

app.get("/about", (req,res) => {
    res.render("about", {
        title: "About Page",
        name: "Pratik Deshmukh"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Pratik Deshmukh"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address)
     return res.send({
         error : "Provide an address"
     })

    geocode(req.query.address, (error, data = {}) => {
        if(error)
            return res.send({
                error: error
            })
        
        forecast(data.latitude, data.longitude, (error, forecastData)=>{
            if(error)
                return res.send({
                    error: error
                })                
            res.send({
                    forecast: forecastData,
                    location: data.location,
                    address: req.query.address
                })
            })
    }) 

})

app.get("/help/*", (req, res) => {
    res.render("errorPage", {
        title: "404",
        errorMessage: "Help cannot be found",
        name: "Pratik Deshmukh"
    })

})

app.get("*", (req, res) => {
    res.render("errorPage", {
        title: "404",
        name: "Pratik Deshmukh",
        errorMessage: "Page cannot be found"

    })
})


app.listen(port, () =>{
    console.log("Server port " + port +" running")
})