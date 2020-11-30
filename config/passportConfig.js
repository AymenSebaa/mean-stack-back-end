const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');
passport.use( new localStrategy( {usernameField: 'email'}, 
    (username, password, done) => {
        User.findOne({email: username}, (err, user) => {
            if(err) return done(err);
            if(!user) return done(null, false, {name: 'email', message: 'Email is not registered'});
            if(!user.verifyPassword(password)) return done(null, false, {name: 'password', message: 'Wrong password'});
            return done(null, user);
        });
    } 
));