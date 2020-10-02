'use strict';

const Charlatan = require('charlatan');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const download = require('image-downloader');
const path = require('path');

// Configuration des accès à mongoDb
var config = require('../src/app/inc/.config');

// Configuration du module charlatan pour utiliser des noms à consonnance française
Charlatan.setLocale('fr');


/**
 * Génère un faux profile d'un utilisateur
 *
 * return Utilisateur
 */
var generateFafkeUser = function () {
    /**
     * generate a fake User content
     */
    return {
        'nickname': Charlatan.Internet.userName(),
        'firstname': Charlatan.Name.firstName(),
        'lastname': Charlatan.Name.lastName(),
        'password': Charlatan.Internet.password(),
        'avatar': Charlatan.Avatar.image(),
        'city': Charlatan.Address.city(),
        'country': Charlatan.Address.country(),
        'email': Charlatan.Internet.email(),
        'birthday': Charlatan.Date.birthday(),
        'presentation': Charlatan.Lorem.characters(50),
        'visitedCountries': [
            Charlatan.Address.country(),
            Charlatan.Address.country(),
            Charlatan.Address.country(),
            Charlatan.Address.country()
        ],

        'gender': Math.round(Math.random()),
        'role': 'membre'
    };

};

/**
 * Extrait le nom de l'image
 *
 * @param {string} user Profil de l'utilisateur généré
 * return Nom de l'image
 */
let extractImageName = function (user) {
    let url = user.avatar.split('/');
    let name = url[url.length - 1]
    return name.split('?')[0];

};

let downloadImage = function (url, imageName) {
    // Configuration d'image-downloader
    const options = {
        url: url,
        dest: path.join(__dirname, '../server/uploads', imageName)
    };

    download.image(options)
        .then(({
                   filename,
                   image
               }) => {
            console.log('File saved to', filename)
        }).catch((err) => {
        throw err
    });

    download.image(options)
        .then(({
                   filename,
                   image
               }) => {
            console.log('File saved to', filename)
        }).catch((err) => {
        throw err
    });
};

/**
 * Sauvegarde dans la base de données
 * @param {Object} user profil de l'utilisateur généré
 * @param {string} urlImage Url de l'image
 * @param {string} imageName Nom de l'image
 * @param {function} callback Fonction de callback
 */
let saveToDb = function (user, urlImage, imageName, callback) {
    // Url de connection
    let url = config.db.connString();

    MongoClient.connect(url, function (err, db) {
        if (err) {
            callback(err);
        } else {
            db.collection('users').insertOne(user, function (err, db) {
                if (err) {
                    callback(err);

                } else {
                    console.log('Profil sauvegardé');
                    callback(null, urlImage, imageName);
                }
            });
        }

        db.close();
    });
};

// Variables globales
let user = generateFafkeUser();
let imageName = extractImageName(user);
let url = user.avatar;
user.avatar = imageName;

/**
 * Sauvegarde les profils en base
 *
 * @param {string} user Nom de l'utilisateur
 * @param {string} url Url de l'image
 * @param {string} imageName Nom de l'image
 * @param {function} Fonction de callback
 */
saveToDb(user, url, imageName, function (err, url, imageName) {
    if (err) {
        console.log(err);
    } else {
        downloadImage(url, imageName);
    }
});
