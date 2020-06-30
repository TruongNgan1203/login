require('./lib/dbconnection');
const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController/userController");

const app = new express();
const urlendcodebodyParser = bodyParser.urlencoded({extended:true});

var port = (process.env.port || 3000);
app.use("/assets", express.static(__dirname +"/public"));
app.use(urlendcodebodyParser);

app.set("view engine","ejs");

userController(app)

app.get("/", function(req,res){
    res.render("login");
})

app.get("/register", function(req,res){
    res.render("register")
})

app.listen(port, function(){
    console.log("Server is running on port: ", port);
});