/**
 * Created by Caciano on 2/15/2017.
 */

const path = require("path");
const express = require("express");
const app = express();
const parse = require("body-parser");

app.set("view engine", "jade");
app.use(parse.json());
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
app.post("/login.html", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
});

app.listen("3000");







