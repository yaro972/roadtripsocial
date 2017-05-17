'use strict';

// Appel des modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

// Initialisation de l'app
var app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

// fichiers statiques (css, img...)
app.use(express.static(path.join(__dirname, '..','dist')));

// Fichiers de configuration des routes
var client = require('./routes/public');
var admin = require('./routes/admin');
var api = require('./routes/api');

app.use('/', client);
app.use('/api', api);
app.use('/admin', admin);

module.exports = app;
