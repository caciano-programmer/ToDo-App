/**
 * Created by Caciano on 2/15/2017.
 */

const path = require("path");
const express = require("express");
const app = express();
const parse = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const mongoURL = "mongodb://localhost:27017/calendar";

function user(email, password)
    {
        this.email = email;
        this.password = password
    }
function event(description, details, date, time)
{
    this.description = description;
    this.details = details;
    this.date = date;
    this.time = time;
}

app.set("view engine", "jade");
app.use(parse.json());
app.use(parse.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(mongoURL, (err,db) =>
{

    db.close();
});

app.get("/", function(req, res){
    res.redirect("login.html");
});
app.get("/login.html", function(req, res){
    res.render("login");
});
app.get("/sign-up.html", function(req, res){
    res.render("sign-up");
});
app.post("/login.html", (req, res) => {
    var email = req.body.loginEmail, password = req.body.loginPass;
    res.redirect("calendar.html");
});
app.get("/calendar.html", function(req, res){
    res.render("calendar");
});

app.listen("3000");
