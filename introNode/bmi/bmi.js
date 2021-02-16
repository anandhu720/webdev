const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var h = Number(req.body.height);
    var w = Number(req.body.weight);
    var bmi = w / (h * h);
    if (bmi >= 25) res.send("You are overweight");
    else if (bmi > 18.5 && bmi < 254.9) res.send("You are in healthy range");
    else res.send("You are underweight");
});

app.listen(8000, function() {
    console.log("listening to port 8000");
});