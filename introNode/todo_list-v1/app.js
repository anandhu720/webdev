const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// let items = [];
// let workItems = [];

//creating schema
const itemsSchema = {
    name: String,
};

const listSchema = {
    name: String,
    items: [itemsSchema],
};

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

const item1 = new Item({
    name: "Welcome to To-Do List",
});

const defaultItems = [item1];

app.get("/", function(req, res) {
    Item.find({}, function(err, result) {
        if (result.length === 0) {
            Item.insertMany(defaultItems, function(err) {
                if (err)
                    console.log(
                        "error Opppss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                    );
                else console.log("hurahh Success!!!!!!!!!!!");
            });
            res.redirect("/");
        } else {
            res.render("list", { listTitle: "Today", newListItem: result });
        }
    });
});

app.get("/:coustomListName", function(req, res) {
    const coustomlistname = req.params.coustomListName;

    const list = {
        name: coustomlistname,
        items: defaultItems,
    };

    list.save();
});

app.post("/delete", function(req, res) {
    const checkedItemName = req.body.checkbox;
    Item.deleteOne({ _id: checkedItemName }, function(err) {
        if (err) console.log("error in deleting element");
        else console.log("deleted checkedElement");
    });
    res.redirect("/");
});

app.post("/", function(req, res) {
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName,
    });
    if (req.body.list === "work") {
        item.save();
        res.redirect("/work");
    } else {
        item.save();
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 3000, function() {
    console.log("port is opened in 3000");
});