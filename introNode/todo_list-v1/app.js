const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res) {
    var today = new Date();

    if (today.getDay() === 6 || today.getDay() === 0) {
        res.sendFile(__dirname+"/index.html");
    } else {
        res.sendFile(__dirname+"/index.html");
    }
});

app.listen(3000, function() {
    console.log("port is opened in 3000");
});
