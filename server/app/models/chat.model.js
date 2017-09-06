'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new mongoose.Schema({
  room: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  nickname: String,
  avatar: String,
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

/**
 * Sauve le message
 */
chat.saveChat = function (msg, callback) {
  chat
    .create(msg, callback);
};


/**
 * Nb messages dans le chat
 */

chat.nbChatMsg = function (callback) {
  chat
    .find()
    .count()
    .exec(callback);
};


module.exports = chat;
