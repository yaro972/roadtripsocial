'use strict';

const mongoose = require('mongoose');

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
    type: String,
    required: true,
    default: null
  },
  sender: {
    type: String,
    required: true,
    default: null
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
  }
});


var messagerie = mongoose.model('Messages', messagerieSchema);


/**
 * Ajoute un nouveau Message
 */
messagerie.addNewMessage = function (newMessage, callback) {
  newMessage.save(callback);
};

module.exports = messagerie;
