const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

// const url = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=48c6dac852ed501a90373affc51ebec1&units=metric"


app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {


    const query = req.body.cityName;
    const apikey = "48c6dac852ed501a90373affc51ebec1";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit

    https.get(url, function (response) {

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            console.log("DATA: ", weatherData)
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>the weather is currently:" + weatherDesc + "<p>");
            res.write("<h1>the tempterure in " + query + " is: </h1>" + temp + " degrees Celcious ");
            res.write("<img src=" + imageURL + ">")
            res.send()

        })

    })

})


app.listen(3000, function () {
    console.log("server is running")
})
