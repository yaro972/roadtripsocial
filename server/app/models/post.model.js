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
  commentId: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});


var posts = mongoose.model('Posts', postSchema);

// Récupère un post
posts.getPostElement = function (owner, callback) {
  posts.findOne({
    owner: owner
  }, callback);
};

/**
 * Ajoute un nouveau post
 */
posts.addNewPost = function (newPost, callback) {
  newPost.save(callback);
};

/**
 * Récupère le dernier post d'un utilisateur
 */
posts.findLast = function (autorId, callback) {
  posts.findOne({
      autorId: autorId
    }, {

    }, {
      sort: {
        'datePost': -1
      }
    })
    .limit(1)
    .exec(callback);
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
    .populate('Posts') // <--
    .populate('commentId') // <--
    .exec(callback);
};

/**
 * Récupère l'ensemble des posts d'un membre spécifié
 */
posts.getOwnerPosts = function (ownerId, callback) {
  posts
    .find({
      ownerId: ownerId
    }, {}, {
      sort: {
        'datePost': -1
      }
    })
    .populate('autorId') // <--
    .populate('Posts') // <--
    .populate('commentId') // <--
    .exec(callback);
};


/**
 * Supprime un post de la Db
 */
posts.deletePost = function (id, callback) {
  posts.deleteOne({
    _id: id
  }, callback);
};

posts.addNewComment = function (postId, commentId, callback) {
  posts
    .findOneAndUpdate({
      _id: postId
    }, {
      $push: {
        commentId: commentId
      }
    })
    .populate('autorId') // <--
    .populate('Posts') // <--
    .populate('commentId') // <--
    .exec(callback);

};

/**
 * Récupère tous les posts
 */
posts.getAllPosts = function (callback) {
  posts
    .find()
    .populate('autorId') // <--
    .populate('Posts') // <--
    .populate('commentId') // <--
    .exec(callback);
};

/**
 * Affiche le détail d'un post
 */
posts.getPostDetail = function (postId, callback) {
  posts
    .find({
      _id: postId
    })
    .populate('autorId') // <--
    .populate('Posts') // <--
    .populate('commentId') // <--
    .exec(callback);
};


posts.dropPost = function (postId, callback) {
  posts
    .remove({
      _id: postId
    }, callback);
};

module.exports = posts;
