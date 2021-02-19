const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiId = "*********************"; //your apiId
    const units = "metric";
    const webUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "&appid=" +
        apiId +
        "&units=" +
        units +
        "";
    https.get(webUrl, function(response) {
        console.log(response.statusCode); //response

        response.on("data", function(data) {
            //getting data
            const weatherData = JSON.parse(data); //object to acess data
            const temp = Number(weatherData.main.temp);
            const discription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>the current weather is " + discription + "<p>");
            res.write("<h1>the temp in " + query + " is: " + temp + "<h1>");
            res.write("<img src=" + iconUrl + "></img>");
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});