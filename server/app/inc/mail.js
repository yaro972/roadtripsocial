'use strict';

// const nodemailer = require('nodemailer');
const path = require('path');
var sendmail = require('sendmail')();
var mailDb = require(path.join(__dirname, './../models/mail.model'));


/**
 * Permet d'envoyer un mail à l'utilisateur de l'application
 */
exports.sendMail = function (sender, receivers, subject, mailContent, isHtmlBody, callback) {

  // Pour les tests
  receivers += ' <thierry.aronoff@gmail.com>';
  let mailEl = {
    sendDate: new Date(),
    receiver: receivers,
    subject: subject,
    content: mailContent
  };

  sendmail({
    from: sender,
    to: receivers,
    bcc: 'yaro76@gmail.com',
    subject: subject,
    html: mailContent,
  }, function (err, reply) {
    callback(err, reply);
    // if (err) {
    //   callback(err, reply);
    // } else {
    mailDb.addNew(mailEl, function (err, mail) {
      // if (err) {
      // callback(err, reply);
      // }
    });
    // }
  });
};
