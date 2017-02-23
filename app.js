/**
 * Created by Caciano on 2/15/2017.
 */

const path = require("path");
const express = require("express");
const app = express();
const parse = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const mongoURL = "mongodb://localhost:27017/calendar";

app.set("view engine", "jade");
app.use(parse.json());
app.use(parse.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

MongoClient.connect(mongoURL, (err,db) =>
{
    if(err != null)
        console.log(err);

    app.get("/", function(req, res){
        res.redirect("login.html");
    });
    app.get("/login.html", function(req, res){
        res.render("login");
    });
    app.get("/sign-up.html", function(req, res){
        res.render("sign-up");
    });
    app.get("/calendar.html", function(req, res){
        res.render("calendar");
    });
    app.post("/login.html", (req, res) => {
        var user =
            {
                email: req.body.loginEmail,
                password: req.body.loginPass
            }
        res.redirect("calendar.html");
    });
    app.post("/sign-up.html", (req, res) => {
        var user =
            {
                email: req.body.user_email,
                password: req.body.user_password
            }
        res.redirect("calendar.html");
    })
    app.post("/calendar.html", (req, res) => {
        console.log(req.body.am-pm);
    });

    db.close();
});

app.listen("3000");
