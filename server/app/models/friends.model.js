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
 * Recherche une demande
 */
Friends.showDemand = function (demandId, callback) {
  Friends
    .findOne({
      _id: demandId
    })
    .populate('friendsList')
    .exec(callback);
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
    // Suppression de la demande existante  - 01/092017
    // Si la demande est validée, on la supprime de la liste

    // .findOneAndUpdate({
    //   _id: friendDemandId
    // }, {
    //   $set: {
    //     accepted: true,
    //     dateDemande: new Date()
    //   }
    // })
    // .exec(callback);

    .find({
      _id: friendDemandId
    })
    .remove()
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


module.exports = Friends;
