'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du schéma à la base de données

let modelSchema = mongoose.Schema({
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'Posts'
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
comment.addComment = function (newComment, callback) {
  let newCommentObj = new comment({
    "parent_id": newComment.parent_id,
    "dateComment": newComment.dateComment,
    "autor": newComment.autor,
    "avatar": newComment.avatar,
    "text": newComment.text
  });


  newCommentObj.save(callback);
};

module.exports = comment;
