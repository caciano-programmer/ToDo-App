/**
 * Created by Caciano on 2/15/2017.
 */

const path = require("path");
const express = require("express");
const app = express();
const parse = require("body-parser");
const cookie = require("cookie-parser");
const mongoose = require("mongoose");
const Session = require("express-session");
const logger = require("morgan");
const MongoStore = require("connect-mongo")(Session);
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mongo_data", (err) => { if(err) throw err; });

app.set("view engine", "jade");
app.use(parse.json());
app.use(parse.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"));
app.use(cookie());
app.use(Session( { secret: "ThisIsCookieCode", saveUninitialized: false, resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}) }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');

app.get("/", function(req, res){
    res.redirect("login");
});
app.get("/login", notLoggedIn, function(req, res){
    res.render("login");
});
app.get("/sign-up", notLoggedIn, function(req, res){
    res.render("sign-up");
});
app.get("/calendar", isLoggedIn, function(req, res){
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render("calendar");
});
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
app.post("/login", passport.authenticate("local.signin", {
    successRedirect: "calendar",
    failureRedirect: "login",
    failureFlash: true
}));
app.post("/sign-up", passport.authenticate("local.sign-up", {
    successRedirect: "calendar",
    failureRedirect: "sign-up",
    failureFlash: true
}));
app.post("/calendar.html", (req, res) => {

});

function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated()) return next();
    res.redirect("/");
}
function notLoggedIn(req, res, next)
{
    if(!req.isAuthenticated()) return next();
    res.redirect("calendar");
}

app.listen("3000");
