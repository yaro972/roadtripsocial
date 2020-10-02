'use strict';

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const config = require('../inc/.config');


/**
 * Configuration du module passport pour l'utitlisation des token (Passport JWT)
 * Documentation https://github.com/themikenicholson/passport-jwt
 */

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.passport.secret;
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
    }));
};
