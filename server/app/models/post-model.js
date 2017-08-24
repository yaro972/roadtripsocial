'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du schéma à la base de données

let postSchema = mongoose.Schema({
  datePost: {
    type: Date,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  autorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  commentTo: {
    type: Schema.Types.ObjectId,
    ref: 'Posts'
  }
});


var posts = mongoose.model('Posts', postSchema);

// Récupère un post
posts.getPostElement = function (owner, callback) {
  posts.findOne({
    owner: owner
  }, callback);
}

/**
 * Ajoute un nouveau post
 */
posts.addNewPost = function (newPost, callback) {
  newPost.save(callback);
}

/**
 * Récupère le dernier post d'un utilisateur
 */
posts.findLast = function (nickname, callback) {
  posts.findOne({
      autors: nickname
    }, {

    }, {
      sort: {
        'datePost': -1
      }
    },
    callback);
};

/**
 * Récupère l'ensemble des posts
 */
posts.getPosts = function (callback) {

  posts
    .find({}, {}, {
      sort: {
        'datePost': -1
      }
    })
    .populate('autorId') // <--
    .exec(callback)
};

/**
 * Supprime un post de la Db
 */
posts.deletePost = function (id, callback) {
  posts.deleteOne({
    _id: id
  }, callback);
};

module.exports = posts;
