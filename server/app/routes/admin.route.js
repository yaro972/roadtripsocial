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



module.exports = router;
