'use strict';

var express = require('express');
var router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../inc/.config');
const mail = require('../inc/mail');
const onlineModule = require('../inc/online.class');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const async = require('async');

// Models
const User = require('../models/user.model');
const Friends = require('../models/friends.model');
const Messages = require('../models/messages.model');
const MessageThread = require('../models/message-thread.model');
const Posts = require('../models/post.model');
const Comments = require('../models/comment.model');


/**
 * Route principlae de la page d'accueil
 */
router.get('/', function (req, res) {
  res.send('PAS ENCORE IMPLEMENTE : Administration du site');
});




/**
 * Récupère la liste de tous les utilisateurs inscrits
 */
router.get('/all-users', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.getAllUsers(function (err, data) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        users: data
      });
    }
  });
});

/**
 * Bloque un utilisateur
 */
router.post('/lock-user', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.lockUser(req.body.userId, function (err, users) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        users: users
      });
    }
  });
});

/**
 * Débloque un utilisateur
 */
router.post('/unlock-user', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.unlockUser(req.body.userId, function (err, users) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        users: users
      });
    }
  });
});

/**
 * Applique les droits d'administrateur
 */
router.post('/pass-to-admin', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.passToAdmin(req.body.userId, function (err, users) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        users: users
      });
    }
  });
});

/**
 * Supprime les droits d'administrateur
 */
router.post('/set-to-member', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.countAdmin(function (err, nbAdmin) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      if (nbAdmin <= 1) {
        res.json({
          err: null,
          notRevoked: true
        });
      } else {
        User.setToMember(req.body.userId, function (err, users) {
          if (err) {
            res.json({
              err: err
            });
          } else {
            res.json({
              err: null,
              users: users
            });
          }
        });
      }
    }
  });
});


/**
 * Récupère tous les posts
 */
router.get('/get-all-posts', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Posts.getAllPosts(function (err, posts) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        posts: posts
      });
    }
  });
});


/**
 * Récupère tous les commentaires
 */
router.get('/get-all-comments', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Comments.getAllComments(function (err, comments) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        comments: comments
      });
    }
  });
});

/**
 * Récupère tous les Messages
 */
router.get('/get-all-messages', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Messages.getAllMessages(function (err, messages) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        messages: messages
      });
    }
  });
});


/**
 * Supprime un message
 */
router.post('/drop-message', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Messages.dropMessage(req.body.messageId, function (err, message) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        message: message
      });
    }
  });
});

/**
 * Supprime un post
 */
router.post('/drop-post', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Posts.dropPost(req.body.postId, function (err, post) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        post: post
      });
    }
  });
});

/**
 * Supprime un commentaire
 */
router.post('/drop-comment', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Comments.dropComment(req.body.commentId, function (err, comment) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        comment: comment
      });
    }
  });
});




module.exports = router;
