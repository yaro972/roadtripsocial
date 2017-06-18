'use strict';

var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
    res.send('Home : Not implemented');
    // res.sendFile('index.html');
});

router.post('/register', function (req, res, next) {
    // Enregistre le nom, le mot de passe crypté dans la Db
    // Vérifie que le compte n'existe pas déjà dans la Db
    // et retourne le status de l'enregistrement en cas de réussite
    let newUser = new User({
        nickname: req.body.nickname,
        password: req.body.password,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        birthdate: req.body.BirthDate,
        city: req.body.city,
        country: req.body.country,
        mail: req.body.mail,
        avatar: req.body.avatar,
        gender: req.body.gender,
        presentation: req.body.presentation
    });

    User.addUser(newUser, function (err, user) {
        if (err) {
            res.json({
                status: false,
                msg: 'Erreur lors de l\'ajout d\'un nouvel utilisateur'
            });
        } else {
            res.json({
                status: true,
                msg: 'L\'utilisateur  ' + user + 'a bien été rajouté'
            });
        }
    });

    // res.send('PAS ENCORE IMPLEMENTE : Formulaire d\'inscription');
});

router.post('/login', function (req, res, next) {
    // Verification du nom de l'utilisateur et du mot de passe associé dans la Db
    res.json({
        txt: 'PAS ENCORE IMPLEMENTE : /login'
    });
});

router.post('/logout', function (req, res, next) {
    // Déconnexion de l'utilisateur Identifié
    // Suppression des éléments de sécurité sauvegardé

    res.json({
        txt: 'PAS ENCORE IMPLEMENTE : /logout'
    });
});


router.post('/profile', function (req, res, next) {
    res.send('/profile : Not implemented');
});

router.post('/add_friend/:friend', function (req, res, next) {
    res.json({
        status: true,
        msg: '/addFriend not implemented',
        friend: req.params.friend
    });
});

router.post('/lost_password', function (req, res, next) {
    res.json({
        status: true,
        msg: '/lost_password not implemented',
        friend: req.params.friend
    });
});

module.exports = router;
