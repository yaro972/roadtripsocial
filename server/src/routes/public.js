'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Home : Not implemented');
    // res.sendFile('index.html');
});

router.post('/register', function (req, res, next) {
    // Enregistre le nom, le mot de passe crypté dans la Db
    // Vérifie que le compte n'existe pas déjà dans la Db
    // et retourne le status de l'enregistrement en cas de réussite

    res.json({
        txt: 'PAS ENCORE IMPLEMENTE : Formulaire d\'inscription'
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
