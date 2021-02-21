const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    var today = new Date();
    var day="";

    if (today.getDay() === 6 || today.getDay() === 0) {
      day="weekend";  
      res.render("list", {kindOfDay : day});
    } else {
      day="weekday";  
      res.render("list",{kindOfDay : day});
    }
});

app.listen(3000, function() {
    console.log("port is opened in 3000");
});
