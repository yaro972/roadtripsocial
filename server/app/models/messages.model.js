'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du schéma à la base de données

let messagerieSchema = mongoose.Schema({
  sendDate: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  parentId: {
    type: String,
    required: false,
    default: null
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false
  },
  threadId: {
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  }
});


var messagerie = mongoose.model('Messages', messagerieSchema);


/**
 * Ajoute un nouveau Message
 */
messagerie.addNewMessage = function (newMessage, callback) {
  newMessage.save(callback);
};

/**
 * Récupère le nombre de messages non lus
 */
messagerie.getUnreadMessages = function (userId, callback) {
  messagerie
    .find({
      receiver: userId,
      isRead: false
    })
    .count()
    .exec(callback);
};

module.exports = messagerie;
