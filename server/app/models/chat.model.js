'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new mongoose.Schema({
  room: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: String,
  updated_at: {
    type: Date,
    default: Date.now
  },
});

var chat = mongoose.model('Chat', ChatSchema);

/**
 * Récupère la liste des rooms
 */
chat.getChat = function (room, callback) {
  chat
    .find({
      room: room
    })
    .populate('userId')
    .exec(callback);
};

chat.saveChat = function (msg, callback) {
  chat
    .create(msg, callback);
};


module.exports = chat;
