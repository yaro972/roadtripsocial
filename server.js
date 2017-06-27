'use strict';

// Appel des modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Mise en place du debogage
var debug = require('debug')('http');
// Compression des données Http
var compression = require('compression');
// Sécurisation des données Http
var helmet = require('helmet');

const config = require('./app/inc/config');
const UserModel = require('./app/models/user.js');

const port = process.env.PORT || config.srv.port;
const ip = process.env.IP || config.srv.ip;

// Initialisation de l'app
var app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(methodOverride());
// Activation de la compression des requëtes
app.use(compression());

// Security 
app.use(helmet());

// Securisation des requêtes
app.use(cors());

// fichiers statiques (css, img...)
app.use(express.static(path.join(__dirname, 'app/public')));

// ===========================
// Passport Config
// ===========================
app.use(passport.initialize());
app.use(passport.session());
require('./app/inc/passport')(passport);



// Fichiers de configuration des routes
var client = require('./app/routes/public');
var admin = require('./app/routes/admin');


// ===========================
// Base de données
// ===========================
var db = mongoose.connection;
// Connexion à la base de donnée
mongoose.connect(config.db.connString());

// Detection de la connection à la base de donnée
db.on('connected', () => {
  console.log('connected on Db ' + config.db.dbName);
  debug('connected on Db ' + config.db.dbName);
});

// En cas d'erreur de connecion à la Db, affichage de celle-ci
db.on('error', (err) => {
  console.log('connection error :', err);
  debug('connection error :', err);
});

db.once('open', () => {
  console.log('Db', config.db.dbName, 'opened')

});

// Routes 
app.use('/', client);
app.use('/admin', admin);

app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {    
    // res.render('404', { url: req.url });
    res.send('<p><strong>ERROR 404</strong><br /> - la page demandée <strong>"'+req.originalUrl +'"</strong> n\'existe pas</p>');

    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


// Traitement des erreurs du serveur
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Activation du port d'écoute du serveur
app.listen(port, ip, function () {
  console.log('Serveur démarré sur le port : ' + port);
});
