'use strict';

var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../models/chat.model.js');
const onlineModule = require('../inc/online.class');
var debug = require('debug')('http');

server.listen(5000);

// socket io
io.on('connection', function (socket) {
  // console.log('User connected');
  debug('User connected');
  onlineModule.addNewUser();

  socket.on('disconnect', function () {
    // console.log('User disconnected');
    debug('User disconnected');
    onlineModule.removeUser();
  });
  socket.on('save-message', function (data) {
    // console.log(data);
    debug(data);
    io.emit('new-message', {
      message: data
    });
  });
});

/* GET ALL CHATS */
router.get('/:room', function (req, res) {
  Chat.getChat(req.params.room, function (err, chats) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json(chats);
    }
  });
});

/* SAVE CHAT */
router.post('/', function (req, res) {
  Chat.saveChat(req.body, function (err, post) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json(post);
    }
  });
});

module.exports = router;
