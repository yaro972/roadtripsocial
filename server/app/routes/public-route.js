'use strict';

var express = require('express');
var router = express.Router();
const User = require('../models/user-model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../inc/.config');


/**
 * Route principale de l'application
 */
router.get('/', function (req, res) {
  // res.send('Home : Not implemented');
  res.sendFile('../../../../front/public');
});

module.exports = router;