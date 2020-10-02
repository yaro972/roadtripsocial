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
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  avatar: {
    type: String,
    required: false
  },
  nickname: {
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
    "nickname": newComment.nickname,
    "text": newComment.text
  });


  newCommentObj.save(callback);
};

/**
 * Récupère tous les commentaires
 */
comment.getAllComments = function (callback) {
  comment
    .find({})
    .exec(callback);
};


/**
 * Supprime un commentaire
 */
comment.dropComment = function (commentId, callback) {
  comment
    .remove({
      _id: commentId
    }, callback);
};


/**
 * Récupère le nombre de commentaires
 */
comment.nbComment = function (callback) {
  comment
    .find()
    .count()
    .exec(callback);
}

module.exports = comment;
