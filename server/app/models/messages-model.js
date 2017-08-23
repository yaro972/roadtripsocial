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
  receiver: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  sender: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
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
