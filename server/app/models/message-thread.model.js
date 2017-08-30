'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du schema de la base de données

const threadMessengerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userA: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userB: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  lastPostDate: {
    type: Date,
    required: false
  }
});


var threadMessenger = mongoose.model('ThreadMessenger', threadMessengerSchema);

// Creation d'un nouveau thread
threadMessenger.addNewThread = function (userA, userB, callback) {
  let newThreadContent = {
    name: '' + userA + userB,
    userA: userA,
    userB: userB,
    lastPostDate: null
  };

  let newThread = new threadMessenger(newThreadContent);
  newThread.save(callback);
};

// Récupération du thread
threadMessenger.getThreadName = function (userA, userB, callback) {

  threadMessenger
    .findOne({
      $or: [{
        name: '' + userA + userB
      }, {
        name: '' + userB + userA
      }]
    })
    .exec(callback);
};

/**
 * Met à jour la date du dernier echange
 */
threadMessenger.updatePostDate = function (threadId, newDate, callback) {
  threadMessenger
    .update({
      _id: threadId
    }, {
      $set: {
        lastPostDate: newDate
      }
    })
    .exec(callback);
};

/**
 * Recupère les contacts des derniers échanges
 */
threadMessenger.getMessengerContactList = function (userId, callback) {
  threadMessenger.find({
      $or: [{
        userA: userId

      }, {
        userB: userId

      }]
    }, {}, {
      sort: {
        'lastPostDate': -1
      }
    })
    .populate('userA')
    .populate('userB')
    .limit()
    .exec(callback);
};

module.exports = threadMessenger;
