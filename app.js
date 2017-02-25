/**
 * Created by Caciano on 2/15/2017.
 */

const path = require("path");
const express = require("express");
const app = express();
const parse = require("body-parser");
const mongoose = require("mongoose");
const Session = require("express-session");
const logger = require("morgan");
const MongoStore = require("connect-mongo")(Session);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/mongo_data", (err) => { if(err) throw err; });

app.set("view engine", "jade");
app.use(parse.json());
app.use(parse.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"));
app.use(Session( { secret: "ThisIsCookieCode", saveUninitialized: false, resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}) }));
app.disable('x-powered-by');

const userSchema = new Schema
({
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, unique: false}
});
const eventSchema = new Schema
({
    user: {type: Schema.ObjectId, required: true, ref: "User"},
    event: {type: String, required: true},
    details: {type: String, required: true},
    hour: {type: Number, required: true},
    minutes: {type: Number, required: true},
    am_pm: {type: String, required: true},
    date: {type: Date, required: true},
});
const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", eventSchema);

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
    let obj =
        {
            email: req.body.loginEmail,
            password: req.body.loginPass
        };
    let user = new User(obj);
    user.save((err) => {if(err) throw err;} );
    res.redirect("calendar.html");
});
app.post("/sign-up.html", (req, res) => {
    let obj =
        {
            email: req.body.user_email,
            password: req.body.user_password
        };
    let user = new User(obj);
    user.save((err) =>
    {
        if(err) throw err;
        User.find( {}, (err, docs) =>
        {
            console.log(docs);
        });
    } );
    res.redirect("calendar.html");
})
app.post("/calendar.html", (req, res) => {
    let event =
        {
            event: req.body.event,
            details: req.body.details,
            hour: req.body.hoursList,
            minutes: req.body.minutesList,
            am_pm: req.body.ampm,
            date: new Date(req.body.year, req.body.month, req.body.day)
        };
    let Event = new Event(event);
    console.log(event);
});

app.listen("3000");
