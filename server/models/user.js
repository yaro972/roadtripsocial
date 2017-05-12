'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var confdb = require('./config/database');

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
    String,
    enum: ['home', 'femme']
  },
  age: {
    type: Number,
    min: 18,
    max: 90
  },
  city : {
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

var User = module.exports = mongoose.model('User', 'UserSchema');

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByNickname = function(nickname, callback) {
  var query = { nickname: nickname };
  User.findOne(query, callback);
};

module.exports.getUserByName = function(name, callback) {
  var query = { name: name };
  User.findOne(query, callback);
};
