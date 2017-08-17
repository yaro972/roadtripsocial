'use strict';

const mongoose = require('mongoose');

// Création du schéma à la base de données

let modelSchema = mongoose.Schema({
  parent_id: {
    type: String,
    required: true
  },
  dateComment: {
    type: Date,
    default: Date.now()
  },
  autor: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: true
  }
});

let comment = mongoose.model('comment', modelSchema);

/**
 * Ajoute un commentaire
 */
comment.addComment = function (comment, callback) {

};

module.exports = comment;
