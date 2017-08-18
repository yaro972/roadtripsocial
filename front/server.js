'use strict';

// Appel des modules
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const session = require('express-session');
const cors = require('cors');
// const passport = require('passport');
// const passportJwt = require('passport-jwt');

const methodOverride = require('method-override');

// Mise en place du debogage
var debug = require('debug')('http');
// Compression des données Http
var compression = require('compression');
// Sécurisation des données Http
var helmet = require('helmet');

var rewrite = require('express-urlrewrite');

// const config = require('./app/inc/config');


// Port par défaut de l'application
let port = process.env.FRONTPORT || 3200;
let ip = process.env.FRONTIP || '127.0.0.1';


// Initialisation de l'app
var app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan('combined'));
app.use(methodOverride());
// Activation de la compression des requëtes
app.use(compression());

// Security
app.use(helmet());

// Securisation des requêtes
app.use(cors());

// fichiers statiques (css, img...)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:var', rewrite('/'));

// Fichiers de configuration des routes
var client = require('./routes/public');

// Routes
app.use('/', client);


app.use(function (req, res) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    // res.render('404', { url: req.url });
    res.send('<p><strong>ERROR 404</strong><br /> - la page demandée <strong>"' + req.originalUrl + '"</strong> n\'existe pas</p>');

    return;
  }
});


// Traitement des erreurs du serveur
app.use(function (err, req, res) {
  // console.error(err.stack);
  debug(err.stack);
  res.status(500).send('Something broke!');
});

// Activation du port d'écoute du serveur
app.listen(port, ip, function () {
  console.log('Serveur démarré sur le port : ' + port + ' Ip :' + ip);
  debug('Serveur démarré sur le port : ' + port + ' Ip :' + ip);
});

// Pour les tests unitaires
module.exports = app;
