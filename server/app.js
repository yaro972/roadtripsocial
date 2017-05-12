'use strict';

// Appel des modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Initialisation de l'app
var app = express();

// fichiers statiques (css, img...)
app.use(express.static(path.join(__dirname, 'public')));

// Fichiers de configuration des routes
var client = require('./routes/public');
var admin = require('./routes/admin');

app.use('/', client);
app.use('/', admin);

module.exports = app;
