/**
 * Created by Caciano on 2/15/2017.
 */

const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
    res.render("login");
});
app.get("/sign-up.html", function(req, res){
    res.render("sign-up");
});
app.get("/login.html", function(req, res){
    res.render("login");
});

app.listen("3000");







