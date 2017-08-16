'use strict';

const Mongoose = require('mongoose');

// Création du schéma à la base de données

let postSchema = Mongoose.Schema({
  datePost: {
    type: date,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  autors: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "Anonymous.png"
  },
  commentTo: {
    type: Number
  }
});

var posts = module.exports = mongoose.model('Posts', postSchema);

// Récupère un post
posts.getPostElement = function (owner, callback) {
  post.findOne({
    owner: owner
  }, callback);
}
