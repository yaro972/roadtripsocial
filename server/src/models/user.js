'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../inc/config');

// Création du schéma à la base de données
var UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: ['home', 'femme']
    },
    age: {
        type: Number,
        min: 18,
        max: 90
    },
    birthdate: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    presentation: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['invite', 'membre', 'admin'],
        default: 'invite'
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByNickname = function (nickname, callback) {
    User.findOne({
        'nickname': nickname
    }, callback);
};

module.exports.getUserByName = function (name, callback) {
    var query = { name: name };
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            callback(true, err);
        } else {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    // callback(true, err);
                    throw err;
                } else {
                    // Store hash in your password DB. 
                    newUser.password = hash;
                    newUser.save(callback);
                }
            });
        }

    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) {
            throw err;
        }

        callback(null, isMatch);
    });
};