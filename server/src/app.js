'use strict';

// Appel des modules
var express = require('express');
var path = require( 'path' );
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var middleware = require('./inc/middleware');

// Initialisation de l'app
var app = express();

var passport = require('passport');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( morgan( 'combined' ) );

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// fichiers statiques (css, img...)
app.use(express.static(path.join(__dirname, '..','dist')));

// Fichiers de configuration des routes
var client = require('./routes/public');
var admin = require('./routes/admin');
var api = require( './routes/api' );

// passport config
// var Account = require('./database/models/user');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());


// Routes 

app.use('/', client);
app.use('/api', api);
app.use('/admin', admin);

app.get( '/', function ( req, res, next ) {
  
})

app.get( '/admin/', middleware.auth, function (req, res, next) { });

module.exports = app;
