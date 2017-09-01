'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du schéma à la base de données
var FriendsSchema = new mongoose.Schema({
  friendsList: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  accepted: {
    type: Boolean,
    default: false
  },
  dateDemande: {
    type: Date,
    required: true
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Friends = mongoose.model('Friends', FriendsSchema);


/**
 * Créé une nouvelle demande d'ami
 */
Friends.addNewFriends = function (userId, friendId, callback) {
  const newFriend = new Friends({
    friendsList: [userId, friendId],
    accepted: false,
    dateDemande: new Date(),
    requester: userId
  });

  newFriend.save(callback);

};


/**
 * Recherche une demande d'ami
 */
Friends.searchFriendDemand = function (userId, friendId, callback) {
  Friends
    .find({
      $and: [{
          friendsList: userId
        }, {
          friendsList: friendId
        },
        {
          requester: {
            $ne: userId
          }
        }
      ]
    })
    .exec(callback);
};

/**
 * Retrouve les demandes d'amis en attente 
 */
Friends.showWaitingFriendsDemand = function (userId, callback) {
  Friends
    .find({
      $and: [{
          friendsList: userId
        },
        {
          accepted: false
        }, {
          requester: {
            $ne: userId
          }
        }
      ]
    })
    .populate('friendsList')
    .sort({
      dateDemande: -1
    })
    .exec(callback);
};


/**
 * Accepte la demande d'un ami
 */
Friends.acceptFriendDemand = function (friendDemandId, callback) {
  Friends
    .findOneAndUpdate({
      _id: friendDemandId
    }, {
      $set: {
        accepted: true,
        dateDemande: new Date()
      }
    })
    .exec(callback);
};

/**
 * Refuse la demande d'un ami
 */
Friends.refuseFriendDemand = function (friendDemandId, callback) {
  Friends
    .find({
      _id: friendDemandId
    })
    .remove()
    .exec(callback);
};

/**
 * Calcule le nb de demandes d'amis en attente
 */
Friends.nbWaintingFriendDemand = function (userId, callback) {
  Friends
    .find({
      $and: [{
        friendsList: userId
      }, {
        accepted: false
      }, {
        requester: {
          $ne: userId
        }
      }]
    })
    .count()
    .exec(callback);
};

/**
 * Retrouve les amis en acceptés 
 */
Friends.showFriends = function (userId, callback) {
  Friends
    .find({
      $and: [{
          friendsList: userId
        },
        {
          accepted: true
        }
      ]
    })
    .populate('friendsList')
    .sort({
      'friendsList.nickname': 1
    })
    .exec(callback);
};

module.exports = Friends;
