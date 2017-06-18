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
    mail: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['home', 'femme']
    },
    age: {
        type: Number,
        min: 18,
        max: 90
    },
    birthdate: {
        type: Number,
        min: 1900,
        max: 2020
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
    pref: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['invite', 'membre', 'admin'],
        default: 'invite'
    }
});

var User = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByNickname = function (nickname, callback) {
    var query = { nickname: nickname };
    User.findOne(query, callback);
};

module.exports.getUserByName = function (name, callback) {
    var query = { name: name };
    User.findOne(query, callback);
};

module.exports.addNewUser = function (userDetails, callback) {
    var member = new User({
        nickname: userDetails.nickname,
        password: userDetails.password,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        birthdate: userDetails.BirthDate,
        city: userDetails.city,
        country: userDetails.country,
        mail: userDetails.mail,
        avatar: userDetails.avatar,
        gender: userDetails.gender,
        presentation: userDetails.presentation
    });

    member.save(function (err) {
        if (err) {
            callback(err, err);
        } else {
            callback(null, 'New member saved');
        }
    });
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { 
            callback(true, err);
        } else {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    callback(true, err);
                } else {
                    // Store hash in your password DB. 
                    newUser.password = hash;
                }
        });
        }
        
    });
};