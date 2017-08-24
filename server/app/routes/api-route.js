'use strict';

var express = require('express');
var router = express.Router();
const User = require('../models/user-model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../inc/.config');
let path = require('path');
const fs = require('fs');

const Posts = require('../models/post-model');
const Comments = require('../models/comment-model');

var multer = require('multer');

var upload = multer({
  dest: path.join(__dirname, '../../uploads/'),
  fileSize: 2 * 1024 * 1024 //2M maxi
});

/**
 * Permet l'upload d'une image correspondante au profil de l'utilisateur
 */
router.post('/uploadFile', upload.any(), function (req, res) {
  fs.rename(path.join(__dirname, '../../uploads/', req.files[0].filename), path.join(__dirname, '../../uploads/', req.files[0].originalname + '.tmp'), function () {
    res.json({
      err: null,
      filename: req.files[0].originalname + '.tmp'
    });
  });

});


/**
 * Permet d'afficher l'image de l'utilisateur
 */
router.get('/display-photo/:img', function (req, res) {
  // Si le nom de l'image n'a pas été donné, l'image par défaut d'avatar est renvoyé
  if (!req.params.img) {
    req.params.img = 'Anonymous.png'
  }
  if (fs.existsSync(path.join(__dirname, '../../uploads', req.params.img))) {
    fs.readFile(path.join(__dirname, '../../uploads', req.params.img), function (err, data) {
      if (err) throw err;
      console.log(data);

      res.send(data);

    });
  } else {
    res.json({
      err: 'File do not exists'
    });
  }
});

/**
 * ajout d'un nouveau post
 */
router.post('/new-post', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  let newPostItem = new Posts({
    "datePost": req.body.datePost,
    "details": req.body.details,
    "autorId": req.body.autorId,
    "commentTo": req.body.commentTo
  });

  Posts.addNewPost(newPostItem, function (err, result) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        post: result._doc
      });
    }
  });
});

/**
 * Récupère le dernier post
 */
router.post('/get-last-post', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  Posts.findLast(req.body.nickname, function (err, data) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        lastPost: data
      });
    }
  });
});


/**
 * Récupère l'ensemble des posts de la base de donnée
 */
router.get('/get-post', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Posts.getPosts(function (err, data) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        posts: data
      });
    }
  });
});

/**
 *Supprime un post de la Db
 */
router.delete('/delete-post/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  Posts.deletePost(req.params.id, function (err, data) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        posts: data
      });
    }
  });
});

/**
 * Ajoute un commentaire
 */
router.post('/add-comment', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  Comments.addComment(req.body, function (err, data) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        posts: data
      });
    }
  });
});

module.exports = router;
