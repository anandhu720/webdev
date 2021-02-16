const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("<h1>hello wolrd</h1>");
});

app.get("/condact", function(req, res) {
    res.send("condact me in anandhu4310@gmail.com");
});

app.get("/about", function(req, res) {
    res.send("my name is anandhu");
});

app.listen(3000, function() {
    console.log("server is opened in port 3000");
});