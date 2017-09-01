'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Création du schéma à la base de données
var UserSchema = new mongoose.Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: ['homme', 'femme']
  },
  age: {
    type: Number,
    min: 18,
    max: 90
  },
  birthdate: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  avatar: {
    type: String,
    default: 'Anonymous.png'
  },
  presentation: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['membre', 'admin'],
    default: 'membre'
  },
  firstConn: {
    type: Boolean,
    default: true
  },
  visitedCountries: {
    type: Array
  },
  friendsList: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  mustChangePassword: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: ''
  }
});

var User = mongoose.model('User', UserSchema);

/**
 * Recherche du nom de l'utilisateur à partir de son Id
 */
User.getUserById = function (id, callback) {
  User.findById(id, callback);
};

/**
 * Recherche d'un utilisateur à partir de son pseudonyme
 */
User.getUserByNickname = function (nickname, callback) {
  User.findOne({
    'nickname': nickname
  }, callback);
};

/**
 * Recherche d'un utilisateur à partir de son prénom
 */
User.getUserByFirstname = function (firstname, callback) {
  var query = {
    firstname: firstname
  };
  User.findOne(query, callback);
};

/**
 * Recherche d'un utilisateur ) partir de son nom
 */
User.getUserByLastname = function (lastname, callback) {
  var query = {
    lastname: lastname
  };
  User.findOne(query, callback);
};

/**
 * Recherche Ajout d'un nouvel utilisateur
 */
User.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      callback(true, err);
    } else {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          callback(true, err);
        } else {
          // Store hash in your password DB.
          newUser.password = hash;
          newUser.save(callback);
        }
      });
    }
  });
};

/**
 * Ajout de la civilité à un utilisateur existant
 */
User.addCivility = function (userNickname, civility, callback) {
  User.update({
    nickname: userNickname
  }, {
    $set: {
      firstname: civility.firstname,
      lastname: civility.lastname,
      gender: civility.gender,
      city: civility.city,
      country: civility.country,
      birthdate: civility.birthdate,
      firstConn: false
    }
  }, callback);

};

/**
 * Ajout du pays et de la présentation à un utilisateur existant
 */
User.addExtraDetails = function (userNickname, extraDetails, callback) {
  User.update({
    nickname: userNickname
  }, {
    $set: {
      presentation: extraDetails.presentation,
      visitedCountries: extraDetails.visitedCountries,
      avatar: extraDetails.avatar,
      firstConn: false
    }
  }, callback);
};

/**
 * Vérifie que le mot de passe entré correspond au mot de passe hashé stocké dans la base de données
 */

User.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) {
      throw err;
    }

    callback(null, isMatch);
  });
};

/**
 * Recherche d'un utilisateur à partir de son adresse email
 */
User.getUserByMail = function (email, callback) {
  User.findOne({
    'email': email
  }, callback);
};

/**
 * Mise à jour de l'ensemble des informations d'un profil
 */
User.updateProfile = function (user, callback) {

  delete user.jourNaissance;
  delete user.moisNaissance;
  delete user.anneeNaissance;

  if (!user.avatar.length) {
    user.avatar = 'Anonymous.png';
  }

  user.firstConn = false;

  User.findOneAndUpdate({
      nickname: user.nickname
    }, {
      $set: user
    }, {
      new: true
    },
    callback);
};


/**
 * Ajout du token de verification de l'identité de l'utilisateur
 */
User.addToken = function (userMail, token, callback) {
  User.update({
      email: userMail
    }, {
      $set: {
        token: token
      }
    },
    callback);
};

/**
 * Suppression du token de verification de l'identité de l'utilisateur
 */
User.resetPassword = function (token, newPassword, callback) {

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      callback(true, err);
    } else {
      bcrypt.hash(newPassword, salt, function (err, hash) {
        if (err) {
          callback(true, err);
        } else {
          // Store hash in your password DB.
          let password = hash;

          User.update({
            token: token
          }, {
            $set: {
              token: '',
              password: password
            }
          }, callback);
        }
      });
    }
  });
};

/**
 * Mise à jour du mot de passe
 */

User.updatePassword = function (nickname, newPassword, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      callback(true, err);
    } else {
      bcrypt.hash(newPassword, salt, function (err, hash) {
        if (err) {
          callback(true, err);
        } else {
          // Store hash in your password DB.
          let password = hash;

          User.update({
            nickname: nickname
          }, {
            $set: {
              password: password
            }
          }, callback);
        }
      });
    }
  });
};

/**
 * Retrouve un utilisateur à partir du token sécurisé généré
 */
User.findByToken = function (token, callback) {
  User.findOne({
    'token': token
  }, callback);
};

/**
 * Recherche un membre quelque soit le champs
 */
User.searchMembers = function (toFind, callback) {

  let regEx = new RegExp(toFind, 'i');
  User.find({
    $or: [{
        nickname: {
          $regex: regEx
        }
      }, {
        firstname: {
          $regex: regEx
        }
      },
      {
        lastname: {
          $regex: regEx
        }
      },
      {
        city: {
          $regex: regEx
        }
      },
      {
        visitedCountries: {
          $regex: regEx
        }
      },
      {
        country: {
          $regex: regEx
        }
      }
    ]
  }, {
    _id: 1,
    nickname: 1,
    firstname: 1,
    lastname: 1,
    avatar: 1,
    city: 1,
    country: 1,
    visitedCountries: 1

  }, callback);
};

/**
 * Recherche un membre via le pseudo
 */
User.searchMembersByNickname = function (nickname, callback) {

  let regEx = new RegExp(nickname, 'i');
  User.find({
      $or: [{
        nickname: {
          $regex: regEx
        }
      }]
    }, {
      _id: 1,
      nickname: 1,
      avatar: 1,
      country: 1
    }).limit(3)
    .exec(function (err, documents) {
      callback(err, documents);
    });
};

/**
 * Retourne le détail de la fiche d'un utilisateur
 */
User.memberDetails = function (memberId, callback) {
  User.findOne({
      _id: memberId
    }, {
      password: 0
    })
    .populate('user')
    .exec(callback);
};

/**
 * Récupération du nombre d'utilisateurs
 */

User.getNbUseregistred = function (callback) {
  User.count({})
    .exec(callback);
};

/**
 * Récupération du nombre de voyages déclarés
 */

User.getNbTravelsegistred = function (callback) {
  User
    .aggregate([{
        $unwind: "$visitedCountries"
      },
      {
        $group: {
          _id: "$visitedCountries",
          nb: {
            $sum: "$visitedCountries.times"
          }
        }
      }
    ])
    .exec(callback);
};


/**
 * Ajout d'un ami dans la liste
 */
User.addFriend = function (userId, friendId, callback) {
  User
    .findOneAndUpdate({
      _id: userId
    }, {
      $push: {
        friendsList: friendId
      }
    })
    .exec(callback);
};

/**
 * Suppression d'un ami dans la liste
 */
User.removeFriend = function (userId, friendId, callback) {
  User
    .findOneAndUpdate({
      _id: userId
    }, {
      $pull: {
        friendsList: friendId
      }
    })
    .exec(callback);
};

module.exports = User;
