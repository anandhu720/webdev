const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

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

    List.findOne({ name: coustomlistname }, function(err, findlist) {
        if (!err) {
            if (!findlist) {
                //create a new list
                const list = new List({
                    name: coustomlistname,
                    items: defaultItems,
                });
                list.save();

                res.redirect("/" + coustomlistname);
            } else {
                res.render("list", {
                    listTitle: findlist.name,
                    newListItem: findlist.items,
                });
            }
        }
    });
});

app.post("/delete", function(req, res) {
    const checkedItemName = req.body.checkbox;
    const checkedListName = req.body.listname;

    if (checkedListName === "Today") {
        Item.deleteOne({ _id: checkedItemName }, function(err) {
            if (err) console.log("error in deleting element");
            else console.log("deleted checkedElement");
        });
        res.redirect("/");
    } else {
        List.findOneAndUpdate({ name: checkedListName }, { $pull: { items: { _id: checkedItemName } } },
            function(err) {
                if (err) console.log(err);
                else {
                    res.redirect("/" + checkedListName);
                }
            }
        );
    }
});

app.post("/", function(req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName,
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName }, function(err, foundlist) {
            foundlist.items.push(item);
            foundlist.save();
            res.redirect("/" + listName);
        });
    }
});

app.listen(process.env.PORT || 3000, function() {
    console.log("port is opened in 3000");
});