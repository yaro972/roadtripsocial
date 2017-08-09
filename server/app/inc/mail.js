'use strict';

// const nodemailer = require('nodemailer');
var sendmail = require('sendmail')();
const config = require('./.config');
const fs = require('fs');


/**
 * Permet d'envoyer un mail à l'utilisateur de l'application
 */
exports.sendMail = function (sender, receivers, subject, mailContent, isHtmlBody, callback) {

  // Pour les tests
  receivers += ' <thierry.aronoff@gmail.com>';

  sendmail({
    from: sender,
    to: receivers,
    subject: subject,
    html: mailContent,
  }, function (err, reply) {
    callback(err, reply);
  });

};