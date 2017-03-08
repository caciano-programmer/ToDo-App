/**
 * Created by Caciano on 2/15/2017.
 */

const path = require("path");
const express = require("express");
const app = express();
const parse = require("body-parser");
const cookie = require("cookie-parser");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const logger = require("morgan");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const passport = require("passport");
const Event = require("./models/events");
require("./config/passport");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mongo_data", (err) => { if(err) throw err; });

app.engine("hbs", hbs({extname: "hbs"}));
app.set('view engine', 'hbs');

app.use(parse.json());
app.use(parse.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"));
app.use(cookie());
app.use(session( { secret: "ThisIsCookieCode", saveUninitialized: false, resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}) }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');

app.get("/", function(req, res){
    res.redirect("login");
});
app.get("/login", notLoggedIn, function(req, res){
    let messages = req.flash("error");
    res.render("login", {messages: messages});
});
app.get("/sign-up", notLoggedIn, function(req, res){
    let messages = req.flash("error");
    res.render("sign-up", {messages: messages});
});
app.get("/calendar", isLoggedIn, function(req, res){
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    Event.find({user: req.user.id}, (err, events) => {
        if(err) throw err;
        res.render("calendar", {events: events});
    });
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
app.post("/calendar", (req, res) => {
    let id = req.user.id;
    let newEvent = new Event({
        user: id,
        event: req.body.event,
        details: req.body.details,
        hour: req.body.hoursList,
        minutes: req.body.minutesList,
        am_pm: req.body.ampm,
        month: req.body.month,
        day: req.body.day,
        year: req.body.year,
    });
    newEvent.save( (err, result) => { if(err) throw err; });
    res.redirect("calendar");
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
