const mongoose = require( 'mongoose' );

var db = require( '../config/config' ).dbUrl;
var UserModel = require( './models/user.js' );


// Configuration de connexion à la base de donnée
mongoose.connect( db );
