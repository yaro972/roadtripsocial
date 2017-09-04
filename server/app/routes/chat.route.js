'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../models/chat.model.js');
const onlineModule = require('../inc/online.class');

server.listen(5000);

// socket io
io.on('connection', function (socket) {
  console.log('User connected');
  onlineModule.addNewUser();

  socket.on('disconnect', function () {
    console.log('User disconnected');
    onlineModule.removeUser();
  });
  socket.on('save-message', function (data) {
    console.log(data);
    io.emit('new-message', {
      message: data
    });
  });
});

/* GET ALL CHATS */
router.get('/:room', function (req, res, next) {
  Chat.find({
    room: req.params.room
  }, function (err, chats) {
    if (err) return next(err);
    res.json(chats);
  });
});

/* SAVE CHAT */
router.post('/', function (req, res, next) {
  Chat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
