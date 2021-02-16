const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var value1 = Number(req.body.num1);
    var value2 = Number(req.body.num2);

    var result = value1 + value2;
    res.send("the sum is " + result);
});

app.listen(3000, function() {
    console.log("server opened in port 3000");
});