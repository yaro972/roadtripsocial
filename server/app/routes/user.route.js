'use strict';

var express = require('express');
var router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../inc/.config');
const mail = require('../inc/mail');
const onlineModule = require('../inc/online.class');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const async = require('async');

// Models
const User = require('../models/user.model');
const Friends = require('../models/friends.model');
const Messages = require('../models/messages.model');
const MessageThread = require('../models/message-thread.model');

var WEBURL = 'http://www.thierry-aronoff.fr:3200';


/**
 * Route d'ajout d'un nouvel utilisateur (Psuedonyme et mot de passe)
 */

router.put('/register', function (req, res) {
  // Enregistre le pseudonyme, le mot de passe crypté dans la Db
  // Vérifie que le compte n'existe pas déjà dans la Db
  // et retourne le status de l'enregistrement en cas de réussite

  let newUser = new User({
    "firstConn": req.body.firstConn,
    "nickname": req.body.nickname,
    "password": req.body.password,
    "email": req.body.email
  });


  // Ajout de l'utilisateur dans la DB
  User.addUser(newUser, function (err, user) {
    if (err) {
      res.json({
        succeed: false,
        msg: 'Erreur lors de l\'ajout d\'un nouvel utilisateur ' + err
      });
    } else {
      // Road Trip Social
      let mailContent = 'Bonjour, <br /><br /> Votre compte <span style="color: black;  font - weight: bold;">\' ' + user.nickname + ' \'</span> a bien été créé sur le site Road Trip Social. <br /><br />Un seul lien pour vous connecter : </br><a href="' + WEBURL + '/login" >Road Trip Social -> Login</a ><br /><br /> Partagez vite vos derniers voyages et aventures !<br /><br/> L\'equipe Road Trip Social ';


      mail.sendMail('Road Trip Social <no-reply@roadtripsocial.com>', user.mail, 'Création de compte', mailContent, null, function (err, info) {
        if (err) {
          res.json({
            err: err
          });
        } else {
          res.json({
            err: null,
            succeed: true,
            msg: 'L\'utilisateur  ' + user + 'a bien été rajouté',
            info: info
          });
        }

      });
    }
  });
});

/**
 * Enregistrement de la Civilité de l'utilisateur
 */
router.post('/register-civility', function (req, res) {
  // Enregistre le nom, prénom de l'utilisateur dans la DB
  User.addCivility(req.body.nickname, req.body.civility, function (err, user) {
    if (err) {
      res.json({
        succeed: false,
        msg: 'Erreur lors de l\'ajout d\'un nouvel utilisateur ' + err
      });
    } else {
      res.json({
        succeed: true,
        msg: 'L\'utilisateur  ' + user + 'a bien été rajouté'
      });
    }
  });
});

/**
 * Enregistre les pays visités et la description de l'utilisateur dans la Db
 */
router.post('/register-extra-details', function (req, res) {
  // Enregistre les pays visités et la description de l'utilisateur dans la Db
  // Recupération des valeurs passées

  let originalAvatarFileName = req.body.extraDetails.avatar;
  let newAvatarFilenameTab = originalAvatarFileName.split('.');
  newAvatarFilenameTab.pop();
  newAvatarFilenameTab[0] = req.body.nickname;

  let newAvatarFilename = newAvatarFilenameTab.join('.');

  // Remplacement du nom de l'avatar
  req.body.extraDetails.avatar = newAvatarFilename;

  // Enregistrement de l'emplacement du fichier original
  let filePathName = path.join(__dirname, '../../uploads/', originalAvatarFileName);

  // Test si le fichier existe
  fs.access(filePathName, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, function (err) {

    if (err) {
      res.json({
        err: "Fichier inexistant"
      });
    } else {
      // Renomme le fichier
      fs.rename(path.join(__dirname, '../../uploads/', originalAvatarFileName), path.join(__dirname, '../../uploads/', newAvatarFilename), function (err) {
        if (err) {
          //
        }

        // Ajout de l'utilisateur dans la DB
        User.addExtraDetails(req.body.nickname, req.body.extraDetails, function (err, user) {
          if (err) {
            res.json({
              succeed: false,
              msg: 'Erreur lors de l\'ajout d\'un nouvel utilisateur ' + err
            });
          } else {
            res.json({
              succeed: true,
              msg: 'L\'utilisateur  ' + user + 'a bien été rajouté'
            });
          }
        });
      });
    }
  });
});


/**
 * Route concernant la connexion de l'utilisateur sur le site
 */
router.post('/login', function (req, res) {
  // Verification du nom de l'utilisateur et du mot de passe associé dans la Db

  const nickname = req.body.nickname;
  const password = req.body.password;

  // Récupération du profil de l'utilisateur à partir de la Db
  User.getUserByNickname(nickname, function (err, user) {
    if (err) {
      res.json({
        'succeed': false
      });
    }

    if (!user) {
      return res.json({
        succeed: false
      });
    }

    // Vérification de la validité du mot de passe
    User.comparePassword(password, user._doc.password, function (err, isMatch) {
      if (err) {
        res.json({
          'succeed': false
        });
      }

      if (isMatch) {
        const token = jwt.sign(user, config.passport.secret, {
          expiresIn: "7d" // 604800 // 1 week
        });

        delete user._doc.password;

        res.json({
          succeed: true,
          token: 'JWT ' + token,
          user: user._doc
        });
      } else {
        res.json({
          succeed: false
        });
      }
    });
  });
});

/**
 * Route d'affichage du profil d'un utilsateur
 */
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  res.json({
    user: req.user
  });
});

/**
 * Route de récupération de l'utilisateur à partir de son adresse email
 */

router.post('/find-user-by-mail', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.getUserByMail(req.body.email, function (err, userProfile) {
    if (err) {
      res.json({
        succeed: false
      });
    } else {
      if (userProfile) {
        if (userProfile.email) {
          res.json({
            succeed: true
          });
          // TODO : Envoyer un mail
        } else {
          res.json({
            succeed: false
          });
        }
      } else {
        res.json({
          succeed: false
        });
      }
    }
  });
});

/**
 * Vérification de la disponibilité du pseudonyme
 */
router.post('/nickname-availability', function (req, res) {
  User.getUserByNickname(req.body.nickname, function (err, userProfile) {
    if (err) {
      res.json({
        succeed: false
      });
    } else {
      if (userProfile) {
        res.json({
          succeed: true,
          available: false
        });
      } else {
        res.json({
          succeed: true,
          available: true
        });
      }
    }
  });
});

/**
 * Mise à jour du profil de l'utilisateur
 */
router.post('/update-profile', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  let originalAvatarFileName = req.body.avatar;
  let newAvatarFilenameTab = originalAvatarFileName.split('.');
  newAvatarFilenameTab.pop();
  newAvatarFilenameTab[0] = req.body.nickname;

  let newAvatarFilename = newAvatarFilenameTab.join('.');

  // Remplacement du nom de l'avatar
  req.body.avatar = newAvatarFilename;

  // Enregistrement de l'emplacement du fichier original
  let filePathName = path.join(__dirname, '../../uploads/', originalAvatarFileName);


  // Test si le fichier existe
  fs.access(filePathName, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, function (err) {

    if (err) {
      res.json({
        err: "Fichier inexistant"
      });
    } else {
      // Renomme le fichier
      fs.rename(path.join(__dirname, '../../uploads/', originalAvatarFileName), path.join(__dirname, '../../uploads/', newAvatarFilename), function (err) {
        if (err) {
          res.json({
            err: "Fichier inexistant"
          });
        }
        // Sauvegarde le profile dans la Db
        User.updateProfile(req.body, function (err, newUserProfile) {
          if (err) {
            res.json({
              err: err
            });
          } else {
            res.json({
              err: null,
              newProfile: newUserProfile
            });
          }
        });

      });
    }
  });
});

/**
 * Route de mot de passe perdu
 */
router.post('/lost-password', function (req, res) {

  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var token = crypto.createHash('sha1').update(current_date + random).digest('hex');

  User.getUserByMail(req.body.email, function (err, userProfile) {

    if (err) {
      res.json({
        succeed: false
      });
    } else {
      if (userProfile) {
        if (userProfile._doc.email) {
          // Ajout d'un token de verification
          User.addToken(req.body.email, token, function (err, userP) {
            if (err) {
              res.json({
                succeed: false
              });
            } else {
              res.json({
                succeed: true,
                token: token,
                profile: userP
              });
            }
          });

        } else {
          res.json({
            succeed: false
          });
        }
      } else {
        res.json({
          succeed: false
        });
      }
    }
  });
});

/**
 * Route de remise à zero du mot de passe
 */
router.post('/reset-password', function (req, res) {

  User.findByToken(req.body.token, function (err, user) {
    if (err) {
      res.json({
        succeed: false
      });
    } else {
      User.resetPassword(req.body.token, req.body.newPass, function (err) {
        if (err) {
          res.json({
            succeed: false
          });
        } else {

          let mailContent = 'Bonjour, <br /><br /> Votre mot de pass <span style="color: black;  font - weight: bold;">\' ' + user.nickname + ' \'</span> a été modifié sur le site Road Trip Social. <br /><br />Un seul lien pour vous connecter : </br><a href="' + WEBURL + '/login" >Road Trip Social -> Login</a ><br /><br /> Partagez vite vos derniers voyages et aventures !<br /><br/> L\'equipe Road Trip Social ';


          mail.sendMail('Road Trip Social <no-reply@roadtripsocial.com>', user.email, 'Réinitialisation du mot de passe', mailContent, null, function (err, info) {
            if (err) {
              res.json({
                err: err
              });
            } else {
              res.json({
                err: null,
                succeed: true,
                txt: info
              });
            }

          });
        }
      });
    }
  });
});

/**
 * Modification du mot de passe de l'utilisateur 
 */
router.post('/change-password', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  // Verification de l'ancien mot de passe
  // Vérification de la validité du mot de passe
  const nickname = req.body.nickname;
  const oldPass = req.body.oldPass;

  // Récupération du profil de l'utilisateur à partir de la Db
  User.getUserByNickname(nickname, function (err, user) {

    if (err) {
      res.json({
        'succeed': false
      });
    }

    if (!user) {
      return res.json({
        'succeed': false
      });
    }

    // Vérification de la validité du mot de passe
    User.comparePassword(oldPass, user._doc.password, function (err, isMatch) {
      if (err) {
        res.json({
          'succeed': false
        });
      }

      if (isMatch) {
        // Mise à jour du nouveau mot de passe

        User.updatePassword(nickname, req.body.newPass, function (err) {
          if (err) {
            res.json({
              'succeed': false,
              'txt': err
            });
          } else {
            res.json({
              'succeed': true
            });

            let mailContent = 'Bonjour, <br /><br /> Votre mot de passe a été changé <span style=" color: black;  font - weight: bold;">\' ' + user.email + ' \'</span> a bien été créé sur le site Road Trip Social. <br /><br />Un seul lien pour vous connecter : </br><a href="' + WEBURL + '/login" >Road Trip Social -> Login</a ><br /><br /> Partagez vite vos derniers voyages et aventures !<br /><br/> L\'equipe Road Trip Social ';


            mail.sendMail('Road Trip Social <no-reply@roadtripsocial.com>', user.email, 'Création de compte', mailContent, null, function (err, info) {
              if (err) {
                res.json({
                  err: err
                });
              } else {
                res.json({
                  err: null,
                  succeed: true,
                  txt: info
                });
              }
            });
          }
        });

      } else {
        res.json({
          'succeed': false
        });
      }
    });
  });

});

/**
 *Recherche un utilisateur quelque soit le champs
 */
router.post('/search-member', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  User.searchMembers(req.body.itemToFind, function (err, rslt) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        membersList: rslt
      });
    }
  });
});

/**
 *Recherche un utilisateur par son pseudo
 */
router.post('/search-member-by-nickname', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  User.searchMembersByNickname(req.body.nickname, function (err, rslt) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        membersList: rslt
      });
    }
  });
});

/**
 * Permet de récupérer le détail d'un profil
 */
router.post('/member-details', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.memberDetails(req.body.memberId, function (err, memberDetail) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        memberDetails: memberDetail
      });
    }
  });
});

/**
 * Route d'enregistrement d'un message envoyé
 */
router.post('/send-message', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  let threadId = 0;
  // Controle si un thread existe déjà
  MessageThread.getThreadName(req.body.msg.receiver._id, req.body.msg.sender, function (err, result) {

    // Si une erreur
    if (err) {
      res.json({
        err: err
      });
    } else {
      if (result === null) {
        // Pas de thread existant
        MessageThread.addNewThread(req.body.msg.receiver._id, req.body.msg.sender, function (err, result) {

          if (err) {
            res.json({
              err: err
            });
          } else {
            threadId = result._doc._id; // Sauvegarde de l'id du thread
            // Ajout du nouveau message


            addNewMessage(req, threadId, function (rslt) {

              if (rslt.err) {
                res.json({
                  err: rslt.err
                });
              } else {
                updateLastDateMessage(threadId, new Date(), function (err, result) {

                  if (err) {
                    res.json({
                      err: err
                    });
                  } else {
                    res.json({
                      err: null,
                      data: result
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        // Un thread existe  
        threadId = result._doc._id; // Sauvegarde de l'id du thread       

        // Ajout du nouveau message
        addNewMessage(req, threadId, function (rslt) {
          if (rslt.err) {
            res.json({
              err: rslt.err
            });
          } else {
            updateLastDateMessage(threadId, new Date(), function (err, result) {
              if (err) {
                res.json({
                  err: err
                });
              } else {
                res.json({
                  err: null,
                  data: result
                });
              }
            });
          }
        });
      }
    }
  });
});

/**
 * Met à jour la date du dernier message
 * @param {ID} threadId Id du thread
 * @param {Date} newDate Date du jour
 * @param {Function} callback Function de callback
 */
function updateLastDateMessage(threadId, newDate, callback) {
  MessageThread.updatePostDate(threadId, newDate, function (err, result) {
    if (err) {
      callback({
        err: err
      });
    } else {
      callback({
        err: null,
        result: result
      });
    }
  });
}

/**
 * Ajoute un nouveau message 
 * @param {*} req Requête
 * @param {*} callback Function de callback
 */
function addNewMessage(req, threadId, callback) {

  // Contenu du nouveau message
  let newMessage = new Messages({
    "sendDate": new Date(),
    "content": req.body.msg.content,
    "receiver": req.body.msg.receiver._id,
    "sender": req.body.msg.sender,
    "isRead": false,
    "parentId": req.body.msg.parentId,
    'threadId': threadId
  });

  // Ajout de la date d'envoi = Date du jour

  Messages.addNewMessage(newMessage, function (err) {
    if (err) {
      callback({
        err: err
      });
    } else {
      User.getUserById(req.body.msg.receiver._id, function (err, user) {
        if (err) {
          callback({
            err: err
          });
        } else {
          // => Envoi du mail
          // Road Trip Social
          let mailContent = 'Bonjour, <br /><br /> Vous avez reçu un nouveau message <br /><br/> L\'equipe Road Trip Social ';


          mail.sendMail('Road Trip Social <no-reply@roadtripsocial.com>', user.email, '[RTS] - Nouveau message', mailContent, null, function (err, info) {
            if (err) {
              callback({
                err: err
              });
            } else {
              callback({
                err: null,
                text: info
              });
            }

          });
          // Fin Envoi du mail
        }
      });
    }
  });
}


/**
 * Calcul le nombre de messages non lus
 */
router.post('/get-nbunread-messages', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  MessageThread.getUnreadMessages(req.body.userId, function (err, nbUnread) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        nbUnread: nbUnread
      });
    }
  });
});

/**
 * Récupère la liste des contacts
 */
router.post('/get-messenger-contact-list', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  MessageThread.getMessengerContactList(req.body.userId, function (err, list) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        contactList: list
      });
    }
  });
});

/**
 * Positionne l'indicateur lu
 */
router.post('/get-thread-messages', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Messages.getThreadMessages(req.body.threadId, function (err, result) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        messageList: result
      });
    }
  });
});



/**
 * Positionne l'indicateur lu
 */
router.post('/set-thread-readstatus', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  MessageThread.setReadStatus(req.body.threadId, req.body.userId, function (err, result) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        messageList: result
      });
    }
  });
});


/**
 * Supprime l'indicateur lu
 */
router.post('/remove-thread-readstatus', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  MessageThread.removeReadStatus(req.body.threadId, req.body.userId, function (err, result) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        messageList: result
      });
    }
  });
});


/**
 * Récupération du nombre d'utilisateurs
 */
router.get('/getNbUseregistred', function (req, res) {
  User.getNbUseregistred(function (err, nbRegistredUsers) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        nbRegistredUsers: nbRegistredUsers
      });
    }
  });
});

/**
 * Récupération du nombre de voyages déclarés
 */
router.get('/getNbTravelsegistred', function (req, res) {
  User.getNbTravelsegistred(function (err, nbRegistredTravels) {

    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        nbRegistredTravels: nbRegistredTravels
      });
    }
  });
});


/**
 * Vérifie si l'enregistrement existe déjà
 * @param {*} req Requete du serveur
 * @param {*} callback Function de callback
 */
function isFriendsDemandExists(req, callback) {
  Friends.searchFriendDemand(req.body.userId, req.body.friendId, function (err, result) {

    if (err) {
      callback(err);
    } else {
      if (result.length) {
        // Un enregistrement existe
        callback(null, true);
      } else {
        // Pas d'enregistrement existant
        callback(null, false);
      }
    }
  });
}


/**
 * Demande d'ajout d'un ami
 */
router.post('/add-friend', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  isFriendsDemandExists(req, function (err, exists) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      if (exists) {
        res.json({
          err: null,
          exists: true
        });
      } else {
        // Ajout de la nouvelle liaison
        Friends.addNewFriends(req.body.userId, req.body.friendId, function (err) {
          if (err) {
            res.json({
              err: err
            });
          } else {
            res.json({
              err: null
            });
          }
        });
      }
    }
  });

});

/**
 * Retrouve les demandes d'amis en attente
 */
router.post('/show-waiting-friends-demand', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Friends.showWaitingFriendsDemand(req.body.userId, function (err, demands) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        demands: demands
      });
    }
  });
});


/**
 * Function d'ajout d'un ami dans la liste
 * @param {String} userId Identifiant de l'utilisateur à modifier
 * @param {String} friendId Identifiant de l'ami
 * @param {Function} callback function de callback
 */
function addFriend(userId, friendId, callback) {
  User.addFriend(userId, friendId, function (err, result) {
    callback(err, result);
  });
}

/**
 * Accepte la demande d'un ami
 */
router.post('/accept-friend-demand', passport.authenticate('jwt', {
  session: false
}), function (req, res) {

  Friends.showDemand(req.body.friendDemandId, function (err, demandDetail) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      // Récupération des identifiants des amis
      let listUsers = demandDetail.friendsList;

      async.parallel([
        function (callback) {
          addFriend(listUsers[0]._id, listUsers[1]._id, callback);
        },
        function (callback) {
          addFriend(listUsers[1]._id, listUsers[0]._id, callback);
        }
      ], function (err, results) {
        if (err) {
          res.json({
            err: err
          });
        } else {

          // Suppression de la demande initiale
          Friends.acceptFriendDemand(req.body.friendDemandId, function (err, demands) {
            if (err) {
              res.json({
                err: err
              });
            } else {
              res.json({
                err: null,
                demands: demands,
                result: results
              });
            }
          });
        }
      });
    }
  });
});

/**
 * Refuse la demande d'un ami
 */
router.post('/refuse-friend-demand', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Friends.refuseFriendDemand(req.body.friendDemandId, function (err, demands) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        demands: demands
      });
    }
  });
});


/**
 * Calcule le nb de demandes d'amis en attente
 */
router.post('/nbWaintingFriendDemand', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  Friends.nbWaintingFriendDemand(req.body.userId, function (err, nbWaiting) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        nbWaiting: nbWaiting
      });
    }
  });
});


/**
 * Suppression d'un ami
 */
router.post('/remove-friend', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  async.parallel([
    function (callback) {
      User.removeFriend(req.body.userId, req.body.friendId, function (err, rslt) {
        callback(err, rslt);
      });
    },
    function (callback) {
      User.removeFriend(req.body.friendId, req.body.userId, function (err, rslt) {
        callback(err, rslt);
      });
    },
  ], function (err, result) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      //
      // debugger
      res.json({
        err: null,
        result: result
      });
    }
  });
});

/**
 * Nombre d'utilisateurs connectés
 */
router.get('/nb-online', function (req, res) {

  res.json({
    nbConnected: onlineModule.getNbUser()
  });
});

/**
 * Récupère la liste de tous les utilisateurs inscrits
 */
router.get('/all-users', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.getAllUsers(function (err, data) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        users: data
      });
    }
  });
});

/**
 * Bloque un utilisateur
 */
router.post('/lock-user', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.lockUser(req.body.userId, function (err, users) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        users: users
      });
    }
  });
});

/**
 * Débloque un utilisateur
 */
router.post('/unlock-user', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.unlockUser(req.body.userId, function (err, users) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        users: users
      });
    }
  });
});

/**
 * Applique les droits d'administrateur
 */
router.post('/pass-to-admin', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.passToAdmin(req.body.userId, function (err, users) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        err: null,
        users: users
      });
    }
  });
});

/**
 * Supprime les droits d'administrateur
 */
router.post('/set-to-member', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  User.countAdmin(function (err, nbAdmin) {
    if (err) {
      res.json({
        err: err
      });
    } else {
      if (nbAdmin <= 1) {
        res.json({
          err: null,
          notRevoked: true
        });
      } else {
        User.setToMember(req.body.userId, function (err, users) {
          if (err) {
            res.json({
              err: err
            });
          } else {
            res.json({
              err: null,
              users: users
            });
          }
        });
      }
    }
  });
});

module.exports = router;
