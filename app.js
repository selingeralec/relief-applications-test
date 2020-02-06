var express = require("express");
var path = require("path");
var app = express();
app.set("view engine", "ejs");

app.get("/", function (req, res){
    res.render("index");
});

app.use(express.static(path.join(__dirname , "public")));

app.listen(3000);

