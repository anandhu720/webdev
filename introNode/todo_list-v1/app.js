const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/js/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let items = [];
let workItems = [];

app.get("/", function(req, res) {
    let day = date.findDate();
    res.render("list", { listTitle: day, newListItem: items });
});

app.get("/work", function(req, res) {
    res.render("list", { listTitle: "work List", newListItem: workItems });
});

app.post("/", function(req, res) {
    let item = req.body.newItem;
    if (req.body.list === "work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function() {
    console.log("port is opened in 3000");
});