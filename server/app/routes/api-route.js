'use strict';

var express = require('express');
var router = express.Router();
const User = require('../models/user-model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../inc/.config');
let path = require('path');
const fs = require('fs');


var multer = require('multer');
var upload = multer({
  dest: 'uploads/'
});

/**
 * Permet l'upload d'une image correspondante au profil de l'utilisateur
 */
router.post('/uploadFile', upload.any(), function (req, res) {

  res.json({
    err: null,
    filename: req.files[0].filename
  });
});


/**
 * Permet d'afficher l'image de l'utilisateur
 */
router.get('/display-photo/:img', function (req, res) {
  fs.readFile(path.join(__dirname, '../../uploads', req.params.img), function (err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(200);
    } else {
      console.log(data);

      res.send(data);
    }

  });
});
module.exports = router;