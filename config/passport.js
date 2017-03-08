/**
 * Created by Caciano on 3/6/2017.
 */

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

passport.serializeUser( (user, done) => {
    done(null, user.id);
});
passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use("local.sign-up", new LocalStrategy({
    usernameField: "email",
    usernamePass: "password",
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if(err) return done(err);
        if(user) return done(null, false, {message: "Email already in use"});
        let newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save( (err, result) => {
            return err ? done(err) : done(null, newUser)
        });
    })
}));

passport.use("local.signin", new LocalStrategy({
    usernameField: "email",
    usernamePass: "password",
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if(err) return done(err);
        if(!user) return done(null, false, {message: "No user found!"});
        if(!user.validPassword(password)) return done(null, false, {message: "Wrong Password!"});
        return done(null, user);
    });
}));

