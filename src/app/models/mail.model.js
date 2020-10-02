'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Création du schéma à la base de données

let mailsSchema = mongoose.Schema({
  sendDate: {
    type: Date,
    require: false
  },
  receiver: {
    type: String,
    require: false
  },
  subject: {
    type: String,
    require: false
  },
  content: {
    type: String,
    require: false
  }
});


var mail = mongoose.model('mail', mailsSchema);


/**
 * Ajoute un nouvel element
 */
mail.addNew = function (mailEl, callback) {
  let newMail = new mail(
    mailEl
  );


  newMail.save(callback);
};

/**
 * Nb de messages
 */
mail.nbMails = function (callback) {
  mail
    .find({})
    .count()
    .exec(callback);
};



module.exports = mail;
