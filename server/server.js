'use strict';

// Appel des modules
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
// const passportJwt = require('passport-jwt');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Chat Modules
// var io = require('socket.io');
const http = require('http').Server(express());
var io = require('socket.io')(http);
// const server = http.createServer();
// io = io.listen(server);

// Mise en place du debogage
var debug = require('debug')('http');
// Compression des données Http
var compression = require('compression');
// Sécurisation des données Http
var helmet = require('helmet');

const config = require('./app/inc/.config');


// Port par défaut de l'application
let port = process.env.BACKPORT || config.srv.port;
let ip = process.env.BACKIP || config.srv.ip;

if (process.env.NODE_ENV === 'test') {
  // Lancement des test unitaires
  port = '9090';
  ip = '127.0.0.1';
}

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
app.use(express.static(path.join(__dirname, 'app/public')));

// ===========================
// Passport Config
// ===========================
app.use(passport.initialize());
app.use(passport.session());
require('./app/inc/passport')(passport);



// Fichiers de configuration des routes
var api = require('./app/routes/api.route');
var userApi = require('./app/routes/user.route');
var admin = require('./app/routes/admin.route');


// ===========================
// Base de données
// ===========================
// db options
// La méthode de connexion a changée.
// Des options de connexion sont nécessaires
// (ref : http://mongoosejs.com/docs/connections.html + http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html#connect)
let options = {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  keepAlive: 1,
  useMongoClient: true,
  native_parser: true,
  autoReconnect: true
};

mongoose.Promise = global.Promise;

// Connexion à la base de donnée
mongoose.connect(config.db.connString(), options)
  .then(function (db) {
    // Db connectée
    // console.log('connected on Db ' + db.db.s.databaseName);
    debug('connected on Db ' + db.db.s.databaseName);

    // console.log('Db', db.db.s.databaseName, 'opened');
    debug('Db', db.db.s.databaseName, 'opened');

  })
  .catch(function (err) {
    //  Erreur de connection
    // console.log('connection error :', err);
    debug('connection error :', err);
  });

// Routes
app.use('/api/user', userApi);
app.use('/api', api);



app.use('/admin', admin);

app.use(function (req, res) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    // res.render('404', { url: req.url });
    res.send('<p><strong>ERROR 404</strong><br /> - la page demandée <strong>"' + req.originalUrl + '"</strong> n\'existe pas</p>');

    return;
  }

  // // respond with json
  // if (req.accepts('json')) {
  //   res.send({
  //     error: 'Not found'
  //   });
  //   return;
  // }
  //
  // // default to plain-text. send()
  // res.type('txt').send('Not found');
});


// Traitement des erreurs du serveur
app.use(function (err, req, res) {
  // console.error(err.stack);
  debug(err.stack);
  res.status(500).send('Something broke!');
});

// Activation du port d'écoute du serveur
app.listen(port, ip, function () {
  // console.log('Serveur démarré sur le port : ' + port + ' IP :' + ip);
  debug('Serveur démarré sur le port : ' + port + ' IP :' + ip);
});

// ===========================
// Chat
// ===========================
io.on('connection', function (socket) {
  console.log('utilisateur connecté');
  socket.on('message', function (msg) {    
    socket.emit('message', msg);
  });
});
http.listen(5000, ip, function () {
  console.log('Serveur de chat démarré sur le port 5000...');
});

// Pour les tests unitaires
module.exports = app;
