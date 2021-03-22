const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

const items = [ 'Buy Food','Cook Food','Eat Food' ];
const workItems = [  ];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
    let day = date.getDate();
    res.render("list",{
        listTitle: day,
        newListItems: items
    })
    // res.render("list",{kindOfDay: currentDay });
    // res.sendFile(__dirname+"/index.html");
})

app.get("/work",function(req,res){    
    res.render("list",{ 
        listTitle: "Work List",
        newListItems: workItems
    })
})
app.get("/about",function(req,res){    
    res.render("about");
})

app.post("/",function(req,res){
    let item = req.body.nextItem;
    if( req.body.list === "Work List" ){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})



app.listen(3000, function(){
    console.log("Server opened in 3000");
})