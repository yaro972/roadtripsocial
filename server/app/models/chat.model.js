'use strict';

var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  room: String,
  nickname: String,
  message: String,
  updated_at: {
    type: Date,
    default: Date.now
  },
});

var chat = mongoose.model('Chat', ChatSchema);

module.exports = chat;
