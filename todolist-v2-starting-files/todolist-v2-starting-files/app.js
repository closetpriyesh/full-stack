//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-priyesh:Test123@cluster0-73t2w.mongodb.net/todolistDB");

const itemSchema = ({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name:"Item1"
});

const item2 = new Item({
  name:"Item2"
});

const item3 = new Item({
  name:"Item3"
})

const defaultItems = [item1, item2, item3];

const ListSchema = ({
  name: String,
  items: [itemSchema]
});

const List = mongoose.model("List", ListSchema);




app.get("/", function(req, res) {

  Item.find({},(err,items) =>
{

    if(items.length === 0)
    {
      Item.insertMany(defaultItems,(err)=>{
        if(err)
        console.log(err);
        else {
          console.log("Successfully inserted");
        }
      });
      res.redirect("/");
    }
    else {
        res.render("list", {listTitle: "Today", newListItems: items});
    }

});

});


app.get("/:routeName",(req, res)=>{
  const customListName = _.capitalize(req.params.routeName);



  List.findOne({name: customListName},(err, foundList)=>{
    if(!err)
    {
      if(!foundList){
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/"+customListName);
      }
      else {
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });




});





app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listTitle = req.body.list;
  const item = new Item({
    name: itemName
  });

if(listTitle === "Today")
{
  item.save();
  res.redirect("/");
}
else {
  List.findOne({name:listTitle},(err, foundList)=>{
    foundList.items.push(item);
    foundList.save();
    res.redirect("/"+listTitle);
  });
}


});


app.post("/delete",(req, res)=>{
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName == "Today")
  {
    Item.findByIdAndRemove(checkedItemId, (err)=>{
      if(err)
      console.log(err);
      else {
        console.log("deleted Successfully");
        res.redirect("/");
      }
    })
  }
  else {
    List.findOneAndUpdate({name: listName},{$pull:{items:{_id:checkedItemId}}},(err, foundList)=>{
        if(!err)
        {
          res.redirect("/"+listName);
        }
    });
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
