'use strict';

const express = require( 'express' );
let router = express.Router();
const config = require('../config/config');
// const db = require( '../models/user' );


router.get( '/', function ( req, res, next ) {
  res.json( {
    status: true,
    msg: '/api/ route not implemented'
  } );  
} );

router.post( '/login', 
  function ( req, res, next ) {
  res.json( {
    status: true,
    msg: '/login route not implemented'
  } );  
} );

router.post( '/register', function ( req, res, next ) {
  res.json( {
    status: true,
    msg: '/register route not implemented'
  } );  
} );

router.post( '/add_friend/:friend', function ( req, res, next ) {
  res.json( {
    status: true,
    msg: '/addFriend not implemented',
    friend: req.params.friend
  } );
} );

router.post( '/lost_password', function ( req, res, next ) {
  res.json( {
    status: true,
    msg: '/lost_password not implemented',
    friend: req.params.friend
  } );
} )
module.exports = router;