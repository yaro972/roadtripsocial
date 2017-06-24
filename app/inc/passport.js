'use strict';

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./config.js');



module.exports = function (passport) {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.passport.secret;
    // opts.issuer = "accounts.examplesoft.com";
    // opts.audience = "yoursite.net";
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.getUserById(jwt_payload._doc._id, function (err, user) {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                done(null, false);
                // or you could create a new account 
            }
        });

        //     User.findOne({ id: jwt_payload.sub }, function (err, user) {
        //         if (err) {
        //             return done(err, false);
        //         }
        //         if (user) {
        //             done(null, user);
        //         } else {
        //             done(null, false);
        //             // or you could create a new account 
        //         }
        //     });
    }));
};